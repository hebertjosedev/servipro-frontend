import { useEffect, useState } from "react";
import { useSession } from "../services/useSession";
import type { UserRequest } from "../interfaces/UserRequest";

const UserDashboard = () => {
  const { token } = useSession();
  const [requests, setRequests] = useState<UserRequest[]>([]);

  useEffect(() => {
    if (!token) return; // ⛔ Evita ejecutar si no hay token
    const fetchRequests = async () => {
      const res = await fetch("http://localhost:8000/api/v1/requests/user-requests", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      setRequests(data);
    };

    fetchRequests();
  }, [token]);

  const grouped = {
    pendiente: requests.filter((r) => r.status === "pendiente"),
    aceptada: requests.filter((r) => r.status === "aceptada"),
    rechazada: requests.filter((r) => r.status === "rechazada"),
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
              <div key={req.id} className="card bg-white shadow-md border border-gray-200 mb-2">
                <div className="card-body">
                  <h3 className="card-title text-gray-600">Datos del profesional:</h3>
                  <p><span className="font-semibold">Nombre:</span> {req.professional_name}</p>
                  <p><span className="font-semibold">Direccion:</span> {req.professional_address}</p>
                  <p><span className="font-semibold">Telefono:</span> {req.professional_phone}</p>
                  <p><span className="font-semibold">Fecha:</span> {new Date(req.created_at).toLocaleString()}</p>
                  <p><span className="font-semibold">Problematica:</span> {req.description}</p>
                  <span className={`badge badge-lg ${
                    req.status === "pendiente" ? "badge-warning" :
                    req.status === "aceptada" ? "badge-success" :
                    req.status === "rechazada" ? "badge-error" : "badge-neutral"
                  }`}>
                    {req.status}
                  </span>
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
