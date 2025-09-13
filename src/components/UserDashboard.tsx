import { useEffect, useState } from "react";
import { useSession } from "../services/useSession";
import type { UserRequest } from "../interfaces/UserRequest";
import ChatPanel from "./ChatPanel";

const UserDashboard = () => {
  const { token } = useSession();
  const [requests, setRequests] = useState<UserRequest[]>([]);
  const [activeChatRequestId, setActiveChatRequestId] = useState<number | null>(
    null
  );

  useEffect(() => {
    if (!token) return; // ⛔ Evita ejecutar si no hay token
    const fetchRequests = async () => {
      const res = await fetch(
        "http://localhost:8000/api/v1/requests/user-requests",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await res.json();
      setRequests(data);
    };

    fetchRequests();
  }, [token]);

  const grouped = {
    pendiente: requests.filter((r) => r.status === "pendiente"),
    aceptada: requests.filter((r) => r.status === "aceptada"),
    rechazada: requests.filter((r) => r.status === "rechazada"),
    finalizada: requests.filter((r) => r.status === "finalizada"),
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Mis Solicitudes</h2>

      {Object.entries(grouped).map(([estado, grupo]) => (
        <div key={estado} className="mb-6">
          <h3 className="text-xl font-semibold capitalize mb-2">{estado}</h3>
          {grupo.length === 0 ? (
            <p className="text-gray-500">No hay solicitudes en este estado.</p>
          ) : (
            grupo.map((req) => (
              <div
                key={req.id}
                className="card bg-white shadow-md border border-gray-200 mb-2"
              >
                <div className="card-body">
                  <h3 className="card-title text-gray-600">
                    Datos del profesional:
                  </h3>
                  <p>
                    <span className="font-semibold">Nombre:</span>{" "}
                    {req.professional_name}
                  </p>
                  <p>
                    <span className="font-semibold">Direccion:</span>{" "}
                    {req.professional_address}
                  </p>
                  <p>
                    <span className="font-semibold">Telefono:</span>{" "}
                    {req.professional_phone}
                  </p>
                  <p>
                    <span className="font-semibold">Fecha:</span>{" "}
                    {new Date(req.created_at).toLocaleString()}
                  </p>
                  <p>
                    <span className="font-semibold">Problematica:</span>{" "}
                    {req.description}
                  </p>
                  <div>
                    {req.status === "aceptada" && (
                      <>
                        <button
                          className="btn"
                          onClick={() => {
                            setActiveChatRequestId(req.id);
                            const dialog = document.getElementById(
                              `chat_modal_${req.id}`
                            ) as HTMLDialogElement;
                            dialog?.showModal();
                          }}
                        >
                          Chat
                        </button>
                        <dialog id={`chat_modal_${req.id}`} className="modal">
                          <div className="modal-box">
                            <h3 className="font-bold text-lg mb-4">
                              Chat con {req.professional_name}
                            </h3>

                            {activeChatRequestId === req.id && token && (
                              <ChatPanel
                                requestId={req.id}
                                token={token}
                                currentUser={{ role: "usuario" }}
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
                      </>
                    )}
                  </div>

                  {/* Barra de progreso */}
                  <div className="mt-4">
                    <div className="relative flex justify-between items-center text-sm text-gray-500">
                      {/* Línea base gris */}
                      <div className="absolute top-2 left-0 w-full h-0.5 bg-gray-300 z-0"></div>

                      {/* Línea progresiva: verde si finalizada, azul en otros casos */}
                      <div
                        className={`absolute top-2 left-0 h-0.5 transition-all duration-300 z-0 ${
                          req.status === "finalizada"
                            ? "bg-green-500"
                            : "bg-blue-500"
                        }`}
                        style={{
                          width: `${
                            ([
                              "pendiente",
                              "aceptada",
                              "rechazada",
                              "finalizada",
                            ].indexOf(req.status) /
                              3) *
                            100
                          }%`,
                        }}
                      ></div>

                      {/* Puntos */}
                      {["pendiente", "aceptada", "rechazada", "finalizada"].map(
                        (estado, index) => {
                          const estadoActual = [
                            "pendiente",
                            "aceptada",
                            "rechazada",
                            "finalizada",
                          ].indexOf(req.status);
                          const isReached = index <= estadoActual;
                          const isFinalizada = req.status === "finalizada";

                          return (
                            <div
                              key={estado}
                              className="relative z-10 flex flex-col items-center w-1/4"
                            >
                              <div
                                className={`w-4 h-4 rounded-full border-2 ${
                                  isFinalizada
                                    ? "bg-green-500 border-green-500"
                                    : isReached
                                    ? "bg-blue-500 border-blue-500"
                                    : "bg-gray-300 border-gray-300"
                                }`}
                              ></div>
                              <span className="mt-1 text-sm text-gray-600">
                                {estado}
                              </span>
                            </div>
                          );
                        }
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      ))}
    </div>
  );
};

export default UserDashboard;
