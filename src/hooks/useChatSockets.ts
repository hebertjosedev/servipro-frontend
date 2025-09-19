// hooks/useChatSocket.ts
import { useEffect } from "react";
// import { useSession } from "../services/useSession";
import { useSessionContext } from "../services/SessionContext";

export const useChatSocket = (requestId: number, token: string) => {
  const { socketRefs, addMessage } = useSessionContext();

  useEffect(() => {
    if (!token || socketRefs.current[requestId]) return;

    const socket = new WebSocket(
      `wss://servipro-backend-production.up.railway.app/api/v1/requests/ws/chat/${requestId}?token=${token}`
    );

    socketRefs.current[requestId] = socket;
    console.log(
      "📌 Socket registrado en socketRefs para requestId:",
      requestId
    );

    socket.onopen = () => {
      console.log(`✅ WebSocket conectado para request ${requestId}`);
      socket.send(JSON.stringify({ type: "ping" }));
    };

    socket.onmessage = (event) => {
      try {
        const msg = JSON.parse(event.data);

        console.log("📥 Mensaje recibido:", msg);

        if (msg.type === "chat" && msg.text?.trim()) {
          addMessage(requestId, {
            sender: msg.sender,
            role: msg.role,
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
