// hooks/useChatSocket.ts
import { useEffect } from "react";
import { useSession } from "../services/useSession";

export const useChatSocket = (requestId: number, token: string) => {
  const { socketRefs, addMessage } = useSession();

  useEffect(() => {
    if (!token || socketRefs.current[requestId]) return;

    const socket = new WebSocket(
      `wss://servipro-backend-production.up.railway.app/api/v1/requests/ws/chat/${requestId}?token=${token}`
    );

    socketRefs.current[requestId] = socket;

    socket.onopen = () => {
      console.log(`✅ WebSocket conectado para request ${requestId}`);
      socket.send(JSON.stringify({ type: "ping" }));
    };

    socket.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        const msg = data.original || data;

        if (msg.text && msg.text.trim() !== "") {
          addMessage(requestId, {
            sender: msg.role || msg.sender,
            text: msg.text,
            timestamp: msg.timestamp || new Date().toISOString(),
          });
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
    };
  }, [requestId, token]);
};
