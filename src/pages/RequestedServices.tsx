import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../services/AuthContext";

const RequestedServices = () => {
  const [requests, setRequests] = useState([]);
  const { token } = useAuth();

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/v1/requests/service-requests", {
          headers: { Authorization: `Bearer ${token}` }
        });
        console.log("Respuesta del backend:", response.data);
        setRequests(response.data);
        console.log(response.data)
      } catch (error) {
        console.error("Error al obtener servicios solicitados:", error);
      }
    };
    fetchRequests();
  }, [token]);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Servicios solicitados</h1>

      {requests.length === 0 ? (
        <p className="text-gray-500">No tienes servicios asignados por ahora.</p>
      ) : (
        <div className="grid gap-6">
          {requests.map((req) => (
            <div key={req.id} className="card bg-white shadow-md border border-gray-200">
              <div className="card-body">
                <h2 className="card-title text-blue-700">{req.description}</h2>
                <p>
                  <span className="font-semibold">Cliente:</span> {req.user_full_name}
                </p>
                <p>
                  <span className="font-semibold">Dirección:</span> {req.user_address}
                </p>
                <p>
                  <span className="font-semibold">Teléfono:</span> {req.user_phone}
                </p>
                <p>
                  <span className="font-semibold">Fecha:</span>{" "}
                  {new Date(req.created_at).toLocaleString()}
                </p>
                <div className="mt-2">
                  <span
                    className={`badge badge-lg ${
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
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RequestedServices;
