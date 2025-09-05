import { useEffect, useState } from "react";
import { useSession } from "../services/useSession";
import type { ServiceRequestPublic } from "../interfaces/ServiceRequest";

const AcceptedServices = () => {
  const { token } = useSession();
  const [requests, setRequests] = useState<ServiceRequestPublic[]>([]);

  useEffect(() => {
    if (!token) return;

    const fetchAccepted = async () => {
      try {
        const res = await fetch("http://localhost:8000/api/v1/requests/accepted-requests", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        setRequests(data);
      } catch (err) {
        console.error("Error al obtener servicios aceptados:", err);
      }
    };

    fetchAccepted();
  }, [token]);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Servicios aceptados</h1>

      {requests.length === 0 ? (
        <p className="text-gray-500">No tienes servicios aceptados por ahora.</p>
      ) : (
        <div className="grid gap-6">
          {requests.map((req) => (
            <div key={req.id} className="card bg-white shadow-md border border-gray-200">
              <div className="card-body">
                <h2 className="card-title text-blue-700">Servicio aceptado</h2>
                <p><span className="font-semibold">Cliente:</span> {req.user_full_name}</p>
                <p><span className="font-semibold">Dirección:</span> {req.user_address}</p>
                <p><span className="font-semibold">Teléfono:</span> {req.user_phone}</p>
                <p><span className="font-semibold">Fecha:</span> {new Date(req.created_at).toLocaleString()}</p>
                <p><span className="font-semibold">Descripción:</span> {req.description}</p>
                <span className="badge badge-success mt-2">{req.status}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AcceptedServices;
