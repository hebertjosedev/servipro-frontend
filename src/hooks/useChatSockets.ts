import { useEffect } from "react";
import { useSessionContext } from "../services/SessionContext";

export const useChatSocket = (requestId: number, token: string) => {
  const {
    socketRefs,
    notifierSocketRefs,
    addMessage,
    markNewMessage,
    setTypingStatus,
    chatIsOpen,
    setPresenceStatus,
    setChatMessages,
  } = useSessionContext();

  useEffect(() => {
    if (
      !token ||
      !requestId ||
      !socketRefs?.current ||
      !notifierSocketRefs?.current
    )
      return;

    // 🧼 Cierra sockets anteriores si existen
    const existingSocket = socketRefs.current[requestId];
    if (existingSocket) {
      existingSocket.close();
      delete socketRefs.current[requestId];
    }

    const existingNotifier = notifierSocketRefs.current[requestId];
    if (existingNotifier) {
      existingNotifier.close();
      delete notifierSocketRefs.current[requestId];
    }

    // 🎙️ Conexión principal (FastAPI)
    const socket = new WebSocket(
      `wss://servipro-backend-production.up.railway.app/api/v1/requests/ws/chat/${requestId}?token=${token}`
    );
    socketRefs.current[requestId] = socket;

    // 🎙️ Conexión secundaria (Node.js)
    const notifierSocket = new WebSocket(
      `wss://notifier-node.onrender.com?token=${token}&requestId=${requestId}`
    );

    notifierSocketRefs.current[requestId] = notifierSocket;

    notifierSocket.onopen = () => {
      console.log("✅ Notifier conectado");

      fetch("https://notifier-node.onrender.com/api/presence", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, status: "online" }),
      });
    };

    notifierSocket.onmessage = (event) => {
      try {
        const msg = JSON.parse(event.data);
        console.log("📥 Evento recibido:", msg);

        if (msg.type === "entregado" && msg.messageId) {
          setChatMessages((prev) => {
            const updated = { ...prev };
            const msgs = updated[requestId] || [];
            updated[requestId] = msgs.map((m) =>
              m.message_id === msg.messageId ? { ...m, delivered: true } : m
            );
            return updated;
          });
        }

        if (msg.type === "presence" && typeof msg.status === "string") {
          setPresenceStatus((prev) => ({
            ...prev,
            [token]: msg.status === "online" ? "online" : "offline",
          }));
        }
      } catch (err) {
        console.error("❌ Error al parsear mensaje de notifier:", err);
      }
    };

    // 📡 Escuchar eventos del backend principal
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

          if (!chatIsOpen(requestId)) {
            markNewMessage(requestId);
          }
        } else if (msg.type === "typing") {
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
        } else if (msg.type === "entregado" && msg.messageId) {
          setChatMessages((prev) => {
            const updated = { ...prev };
            const msgs = updated[requestId] || [];
            updated[requestId] = msgs.map((m) =>
              m.message_id === msg.messageId ? { ...m, delivered: true } : m
            );
            return updated;
          });
        } else if (msg.type === "presence" && typeof msg.status === "string") {
          setPresenceStatus((prev) => ({
            ...prev,
            [requestId]: msg.status === "online" ? "online" : "offline",
          }));
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

      const notifier = notifierSocketRefs.current?.[requestId];
      if (notifier) {
        notifier.close();
        delete notifierSocketRefs.current[requestId];
      }
    };
  }, [requestId, token]);
};
