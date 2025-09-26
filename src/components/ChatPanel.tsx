import { useEffect, useState } from "react";
import type {
  ChatPanelProps,
  DisplayMessage,
  Message,
} from "../interfaces/ChatPanelType";
import { useSessionContext } from "../services/SessionContext";
import { useChatSocket } from "../hooks/useChatSockets";

const ChatPanel = ({ requestId, currentUser, token }: ChatPanelProps) => {
  const [input, setInput] = useState("");
  const {
    chatMessages,
    addMessage,
    socketRefs,
    typingStatus,
    clearNewMessage,
    presenceStatus
  } = useSessionContext();
  const messages = chatMessages[requestId] || [];

  useChatSocket(requestId, token); // 🎙️ WebSocket persistente

  useEffect(() => {
    if (!token) return;

    clearNewMessage(requestId);

    // 🟢 Emitir presencia "online"
    fetch("https://servipro-backend.onrender.com/api/presence", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token, status: "online" }),
    });

    const fetchMessages = async () => {
      try {
        const res = await fetch(
          `https://servipro-backend-production.up.railway.app/api/v1/requests/chat-messages/${requestId}`
        );
        const contentType = res.headers.get("content-type");

        if (!res.ok) {
          const errorText = await res.text();
          console.error("❌ Error HTTP:", res.status, errorText);
          return;
        }

        if (!contentType?.includes("application/json")) {
          const html = await res.text();
          console.error("❌ Respuesta no es JSON:", html);
          return;
        }

        const rawData = await res.json();

        const normalized: DisplayMessage[] = rawData
          .filter((msg: Message) => msg.text?.trim())
          .map((msg: Message) => {
            const name =
              msg.sender_name || msg.sender?.split("@")[0] || "Desconocido";
            const roleLabel =
              msg.sender_role === "user" ? "USUARIO" : "PROFESIONAL";
            return {
              message_id: msg.message_id,
              sender: `${roleLabel} - ${name}`,
              role: msg.sender_role,
              text: msg.text,
              timestamp: msg.timestamp,
            };
          });

        normalized.forEach((msg: DisplayMessage) => {
          addMessage(requestId, msg);

          // ✅ Emitir "entregado" por cada mensaje recibido
          fetch("https://servipro-backend.onrender.com/api/deliver", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              token,
              messageId: msg.message_id,
            }),
          });
        });
      } catch (err) {
        console.error("❌ Error al cargar historial:", err);
      }
    };

    fetchMessages();

    return () => {
      // 🔴 Emitir presencia "offline"
      fetch("https://servipro-backend.onrender.com/api/presence", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, status: "offline" }),
      });
    };
  }, [requestId, token]);

  const sendMessage = () => {
    const trimmed = input.trim();
    if (!trimmed) {
      console.warn("⚠️ Mensaje vacío no enviado");
      return;
    }

    const socket = socketRefs.current[requestId];
    if (socket?.readyState === WebSocket.OPEN) {
      socket.send(JSON.stringify({ type: "chat", text: trimmed }));
      setInput("");
      clearNewMessage(requestId);
    } else {
      console.warn("⚠️ No se envió: socket cerrado o inválido");
    }
  };

  const handleTyping = () => {
    const trimmed = input.trim();
    if (!trimmed) return;

    const socket = socketRefs.current[requestId];
    if (socket?.readyState === WebSocket.OPEN) {
      socket.send(JSON.stringify({ type: "typing" }));
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="h-64 overflow-y-auto border rounded p-2 bg-gray-50">
        {presenceStatus[requestId] === "online" && (
          <div className="flex items-center gap-2 text-sm text-green-600 mb-2">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
            En línea
          </div>
        )}
        {messages
          .filter((msg) => msg.text?.trim())
          .map((msg, idx) => (
            <div
              key={idx}
              className={`p-2 mb-1 rounded ${
                msg.role === currentUser.role
                  ? "bg-blue-100 text-right"
                  : "bg-gray-200 text-left"
              }`}
            >
              <strong>{msg.sender?.toUpperCase() || "Desconocido"}:</strong>{" "}
              {msg.text}
              <br />
              <small>
                {new Date(msg.timestamp).toLocaleTimeString()}
                {msg.delivered && (
                  <span className="ml-1 text-green-500">✔</span>
                )}
              </small>
            </div>
          ))}

        {typingStatus[requestId]?.active && (
          <div className="text-sm italic text-gray-500 mb-2 text-left animate-pulse">
            {typingStatus[requestId]?.name
              ? `${typingStatus[requestId].name} está escribiendo...`
              : currentUser.role === "user"
              ? "Profesional está escribiendo..."
              : "Usuario está escribiendo..."}
          </div>
        )}
      </div>
      <div className="flex gap-2">
        <input
          value={input}
          onChange={(e) => {
            setInput(e.target.value);
            handleTyping();
          }}
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
