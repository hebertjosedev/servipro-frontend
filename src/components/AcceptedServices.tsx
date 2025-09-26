import { useEffect, useState } from "react";
// import { useSession } from "../services/useSession";
import { useSessionContext } from "../services/SessionContext";
import type { ServiceRequestPublic } from "../interfaces/ServiceRequest";
import ChatPanel from "./ChatPanel";

const AcceptedServices = () => {
  const { token, hasNewMessages, presenceStatus } = useSessionContext();
  const [requests, setRequests] = useState<ServiceRequestPublic[]>([]);
  const [activeChatRequestId, setActiveChatRequestId] = useState<number | null>(
    null
  );

  useEffect(() => {
    if (!token) return;

    const fetchAccepted = async () => {
      try {
        const res = await fetch(
          "https://servipro-backend-production.up.railway.app/api/v1/requests/accepted-requests",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        const data = await res.json();
        setRequests(data);
      } catch (err) {
        console.error("Error al obtener servicios aceptados:", err);
      }
    };

    fetchAccepted();
  }, [token]);

  const handleUpdateStatus = async (
    id: number,
    action: "accept" | "reject" | "finalize"
  ) => {
    try {
      const res = await fetch(
        `https://servipro-backend-production.up.railway.app/api/v1/requests/service-requests/${id}/${action}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!res.ok) throw new Error("Error al actualizar estado");

      const updated = await res.json();

      // Actualiza el estado local para reflejar el cambio
      setRequests((prev) =>
        prev.map((r) => (r.id === id ? { ...r, status: updated.status } : r))
      );
    } catch (err) {
      console.error("Error al actualizar solicitud:", err);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">
        Servicios aceptados
      </h1>

      {requests.length === 0 ? (
        <p className="text-gray-500">
          No tienes servicios aceptados por ahora.
        </p>
      ) : (
        <div className="grid gap-6">
          {requests.map((req) => (
            <div
              key={req.id}
              className="card bg-white shadow-md border border-gray-200"
            >
              <div className="card-body">
                <h2 className="card-title text-blue-700">Servicio aceptado</h2>
                <p>
                  <span className="font-semibold">Cliente:</span>{" "}
                  {req.user_full_name}
                </p>
                <p>
                  <span className="font-semibold">Dirección:</span>{" "}
                  {req.user_address}
                </p>
                <p>
                  <span className="font-semibold">Teléfono:</span>{" "}
                  {req.user_phone}
                </p>
                <p>
                  <span className="font-semibold">Fecha:</span>{" "}
                  {new Date(req.created_at).toLocaleString()}
                </p>
                <p>
                  <span className="font-semibold">Descripción:</span>{" "}
                  {req.description}
                </p>
                <span className="badge badge-success mt-2">{req.status}</span>
                {req.status === "aceptada" && (
                  <div className="flex gap-2 mt-4">
                    {/* Botón de Chat */}
                    <button
                      className="relative btn btn-sm btn-secondary"
                      onClick={() => {
                        setActiveChatRequestId(req.id);
                        const dialog = document.getElementById(
                          `chat_modal_${req.id}`
                        ) as HTMLDialogElement;
                        dialog?.showModal();
                      }}
                    >
                      Chat
                      {hasNewMessages[req.id] && (
                        <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-ping" />
                      )}
                    </button>

                    <button
                      className="btn btn-sm btn-primary"
                      onClick={() => handleUpdateStatus(req.id, "finalize")}
                    >
                      Terminado
                    </button>

                    {/* Modal de Chat */}
                    <dialog id={`chat_modal_${req.id}`} className="modal">
                      <div className="modal-box">
                        <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                          Chat con {req.user_full_name}
                          {presenceStatus?.[req.id] === "online" && (
                            <span className="text-green-600 text-sm font-normal">
                              · en línea
                            </span>
                          )}
                        </h3>

                        {activeChatRequestId === req.id && token && (
                          <ChatPanel
                            requestId={req.id}
                            token={token}
                            currentUser={{ role: "profesional" }}
                          />
                        )}
                        <form method="dialog" className="modal-action">
                          <button
                            className="btn"
                            onClick={() => setActiveChatRequestId(null)}
                          >
                            Cerrar
                          </button>
                        </form>
                      </div>
                    </dialog>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AcceptedServices;
