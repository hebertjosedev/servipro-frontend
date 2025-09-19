import { useEffect, useState } from "react";
import axios from "axios";
// import { useSession } from "../services/useSession";
import { useSessionContext } from "../services/SessionContext";
import type { ServiceRequestPublic } from "../interfaces/ServiceRequest";

const RequestedServices = () => {
  const [requests, setRequests] = useState<ServiceRequestPublic[]>([]);
  const { token } = useSessionContext();

  useEffect(() => {
    if (!token) return; // ⛔ Evita ejecutar si no hay token

    const fetchRequests = async () => {
      try {
        const response = await axios.get(
          "https://servipro-backend-production.up.railway.app/api/v1/requests/service-requests",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setRequests(response.data);
      } catch (error) {
        console.error("Error al obtener servicios solicitados:", error);
      }
    };
    fetchRequests();
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
        Servicios solicitados
      </h1>

      {requests.length === 0 ? (
        <p className="text-gray-500">
          No tienes servicios asignados por ahora.
        </p>
      ) : (
        <div className="grid gap-6">
          {requests.map((req) => (
            <div
              key={req.id}
              className="card bg-white shadow-md border border-gray-200"
            >
              <div className="card-body">
                <h2 className="card-title text-blue-700">
                  Solicitud a resolver:
                </h2>
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
                  <span className="font-semibold">Problematica:</span>{" "}
                  {req.description}
                </p>
                <div className="mt-2">
                  <span
                    className={`badge badge-md ${
                      req.status === "pendiente"
                        ? "badge-warning"
                        : req.status === "aceptada"
                        ? "badge-success"
                        : req.status === "rechazada"
                        ? "badge-error"
                        : "badge-neutral"
                    }`}
                  >
                    {req.status}
                  </span>
                </div>
                {req.status === "pendiente" && (
                  <div className="flex gap-2 mt-4">
                    <button
                      className="btn btn-success"
                      onClick={() => handleUpdateStatus(req.id, "accept")}
                    >
                      Aceptar
                    </button>
                    <button
                      className="btn btn-error"
                      onClick={() => handleUpdateStatus(req.id, "reject")}
                    >
                      Rechazar
                    </button>
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

export default RequestedServices;
