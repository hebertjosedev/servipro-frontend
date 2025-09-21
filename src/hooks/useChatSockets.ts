import { useEffect } from "react";
import { useSessionContext } from "../services/SessionContext";

export const useChatSocket = (requestId: number, token: string) => {
  const {
    socketRefs,
    addMessage,
    markNewMessage,
    setTypingStatus,
    chatIsOpen,
  } = useSessionContext();

  useEffect(() => {
    if (!token || !requestId || !socketRefs?.current) return;

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

          // 🔔 Notificación si el chat no está abierto
          if (!chatIsOpen(requestId)) {
            markNewMessage(requestId);
          }
        }

        // 💬 Evento de escritura
        else if (msg.type === "typing") {
          setTypingStatus((prev) => ({
            ...prev,
            [requestId]: {
              active: true,
              name: msg.sender_name,
            },
          }));

          setTimeout(() => {
            setTypingStatus((prev) => ({
              ...prev,
              [requestId]: {
                active: false,
                name: undefined,
              },
            }));
          }, 3000);
        } else {
          console.warn("⚠️ Evento ignorado por tipo desconocido:", msg);
        }
      } catch (err) {
        console.error("❌ Error al parsear mensaje:", err);
      }
    };

    socket.onerror = (err) => {
      console.error("❌ Error en WebSocket:", err);
    };

    socket.onclose = () => {
      delete socketRefs.current?.[requestId];
    };

    // 🧼 Limpieza editorial al desmontar
    return () => {
      const socket = socketRefs.current?.[requestId];
      if (socket) {
        socket.close();
        delete socketRefs.current[requestId];
      }
    };
  }, [requestId, token]);
};
