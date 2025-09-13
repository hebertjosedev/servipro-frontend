// components/ChatPanel.tsx
import { useEffect, useState, useRef } from "react";

const ChatPanel = ({ requestId, currentUser, token }) => {
  const [messages, setMessages] = useState<{ sender: string; text: string; timestamp: string }[]>([]);
  const [input, setInput] = useState("");
  const socketRef = useRef<WebSocket | null>(null);

useEffect(() => {
  if (!token) return;

  // 1. Cargar historial desde el backend
const fetchMessages = async () => {
  try {
    const res = await fetch(`/api/v1/requests/chat-messages/${requestId}`);
    const contentType = res.headers.get("content-type");

    if (!res.ok) {
      const errorText = await res.text();
      console.error("❌ Error HTTP:", res.status, errorText);
      return;
    }

    if (!contentType || !contentType.includes("application/json")) {
      const html = await res.text();
      console.error("❌ Respuesta no es JSON:", html);
      return;
    }

    const rawData = await res.json();

    const normalized = rawData
      .filter((msg) => msg.text && msg.text.trim() !== "")
      .map((msg) => ({
        sender: msg.sender_role,
        text: msg.text,
        timestamp: msg.timestamp,
      }));

    setMessages(normalized);
  } catch (err) {
    console.error("❌ Error al cargar historial:", err);
  }
};

  fetchMessages(); // ← Esto carga los mensajes persistidos

  // 2. Conectar WebSocket
  const socket = new WebSocket(`ws://localhost:8000/api/v1/requests/ws/chat/${requestId}?token=${token}`);
  socketRef.current = socket;

  socket.onopen = () => {
    console.log("✅ WebSocket conectado");
    socket.send(JSON.stringify({ type: "ping", content: "Hola desde el cliente" }));
  };

socket.onmessage = (event) => {
  try {
    const data = JSON.parse(event.data);
    console.log("📨 Mensaje recibido:", data);

    const msg = data.original || data;
    if (msg.text && msg.text.trim() !== "") {
      const normalizedMsg = {
        sender: msg.role || msg.sender, // depende de cómo lo envíes desde el backend
        text: msg.text,
        timestamp: msg.timestamp || new Date().toISOString(), // fallback si no viene timestamp
      };

      setMessages((prev) => [...prev, normalizedMsg]);
    }
  } catch (err) {
    console.error("❌ Error al parsear mensaje:", err);
  }
};

  socket.onerror = (err) => {
    console.error("❌ Error en WebSocket:", err);
  };

  socket.onclose = () => {
    console.warn("🔒 WebSocket cerrado");
  };

  return () => {
    socket.close();
  };
}, [requestId, token]);

const sendMessage = () => {
  if (socketRef.current && input.trim()) {
    const message = {
      sender: currentUser.role,
      text: input,
    };
    socketRef.current.send(JSON.stringify(message));
    setInput(""); // solo limpiamos el input
  }
};

  return (
    <div className="flex flex-col gap-4">
      <div className="h-64 overflow-y-auto border rounded p-2 bg-gray-50">
{messages
    .filter((msg) => msg.text && msg.text.trim() !== "")
    .map((msg, idx) => (
      <div
        key={idx}
        className={`p-2 mb-1 rounded ${
          msg.sender === currentUser.role
            ? "bg-blue-100 text-right"
            : "bg-gray-200 text-left"
        }`}
      >
        <strong>{msg.sender.toUpperCase()}:</strong> {msg.text}
        <br />
        <small>{new Date(msg.timestamp).toLocaleTimeString()}</small>
      </div>
    ))}
      </div>
      <div className="flex gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 border rounded px-2"
          placeholder="Escribe un mensaje..."
        />
        <button onClick={sendMessage} className="btn btn-sm btn-primary">
          Enviar
        </button>
      </div>
    </div>
  );
};

export default ChatPanel;
