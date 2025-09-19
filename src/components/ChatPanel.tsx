// components/ChatPanel.tsx
import { useEffect, useState } from "react";
import type { ChatPanelProps, DisplayMessage, Message } from "../interfaces/ChatPanelType";
// import { useSession } from "../services/useSession";
import { useSessionContext } from "../services/SessionContext";
import { useChatSocket } from "../hooks/useChatSockets";

const ChatPanel = ({ requestId, currentUser, token }: ChatPanelProps) => {
  const [input, setInput] = useState("");
  const { chatMessages, addMessage, socketRefs } = useSessionContext();
  const messages = chatMessages[requestId] || [];

  useChatSocket(requestId, token); // ← WebSocket persistente

  useEffect(() => {
    if (!token) return;

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

        if (!contentType || !contentType.includes("application/json")) {
          const html = await res.text();
          console.error("❌ Respuesta no es JSON:", html);
          return;
        }

        const rawData = await res.json();

        const normalized: DisplayMessage[] = rawData
          .filter((msg: Message) => msg.text && msg.text.trim() !== "")
          .map((msg: Message) => ({
            sender: msg.sender,
            role: msg.sender_role,
            text: msg.text,
            timestamp: msg.timestamp,
          }));

        normalized.forEach((msg: DisplayMessage) => {
          addMessage(requestId, msg);
        });
      } catch (err) {
        console.error("❌ Error al cargar historial:", err);
      }
    };

    fetchMessages();
  }, [requestId, token, addMessage]);

  const sendMessage = () => {
    const socket = socketRefs.current[requestId];
    console.log("📤 Intentando enviar:", input);
    console.log("🔌 Estado del socket:", socket?.readyState);
    console.log("🔌 Socket:", socket);
    if (socket && input.trim()) {
      const message = {
        type: "chat",
        text: input,
      };
      socket.send(JSON.stringify(message));
      console.log("✅ Mensaje enviado:", message);
      setInput("");
    } else {
      console.warn("⚠️ No se envió: socket cerrado o input vacío");
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
                msg.role === currentUser.role
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
