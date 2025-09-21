// hooks/useChatSocket.ts
import { useEffect } from "react";
// import { useSession } from "../services/useSession";
import { useSessionContext } from "../services/SessionContext";

export const useChatSocket = (requestId: number, token: string) => {
  const { socketRefs, addMessage } = useSessionContext();

  useEffect(() => {
  if (!token || !requestId) return;

  // 🧼 Cierra socket anterior si existe
  const existingSocket = socketRefs.current[requestId];
  if (existingSocket) {
    existingSocket.close();
    delete socketRefs.current[requestId];
  }

  // 🎙️ Crea nuevo socket
  const socket = new WebSocket(
    `wss://servipro-backend-production.up.railway.app/api/v1/requests/ws/chat/${requestId}?token=${token}`
  );

  socketRefs.current[requestId] = socket;

  socket.onopen = () => {
    socket.send(JSON.stringify({ type: "ping" }));
  };

  socket.onmessage = (event) => {
    try {
      const msg = JSON.parse(event.data);

      if (
        msg.type === "chat" &&
        msg.text?.trim() &&
        typeof msg.sender === "string" &&
        typeof msg.role === "string"
      ) {
        addMessage(requestId, {
          message_id: msg.message_id,
          sender: msg.sender,
          role: msg.role,
          text: msg.text,
          timestamp: msg.timestamp || new Date().toISOString(),
        });
      } else {
        console.warn("⚠️ Mensaje ignorado por formato incompleto:", msg);
      }
    } catch (err) {
      console.error("❌ Error al parsear mensaje:", err);
    }
  };

  socket.onerror = (err) => {
    console.error("❌ Error en WebSocket:", err);
  };

  socket.onclose = () => {
    console.warn(`🔒 WebSocket cerrado para request ${requestId}`);
    delete socketRefs.current[requestId];
  };

  return () => {
    socket.close();
    delete socketRefs.current[requestId]; // 🧼 Limpieza editorial
  };
}, [requestId, token]);

};
