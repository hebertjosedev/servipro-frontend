import { useEffect, useState } from "react";
import { useAuth } from "../../services/AuthContext";
import { useProfessionalAuth } from "../../services/ProfessionalAuthContext";
import ModalBase from "./ModalBase";
import axios from "axios";

export interface ModalDireccionProps {
  value: string;
  onChange: (e: any, f: any) => void;
  onSave: () => Promise<void>;
  onClose: () => void;
}

const ModalDireccion = ({ onClose }: ModalDireccionProps) => {
  const { user, token: userToken, setUser } = useAuth();
  const { professional, token: professionalToken, setProfessional } = useProfessionalAuth();

  console.log("Usuario:", user);
  console.log("Profesional:", professional);


  const isProfessional = professional?.role === "professional";
  const token = userToken || professionalToken;

  const [direccion, setDireccion] = useState("");

  // 🔄 Sincroniza la dirección al abrir el modal
  useEffect(() => {
    const direccionActual = isProfessional
      ? professional?.address || ""
      : user?.address || "";
    setDireccion(direccionActual);
  }, [user, professional]);

  const handleSave = async () => {
    try {
      const endpoint = isProfessional
        ? "http://localhost:8000/api/v1/professionals/update-contact"
        : "http://localhost:8000/api/v1/users/update-contact";

      const res = await axios.put(
        endpoint,
        { address: direccion },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (isProfessional) {
        setProfessional(res.data);
      } else {
        setUser(res.data);
      }

      setDireccion(res.data.address || "");
      onClose();
    } catch (err) {
      console.error("Error al actualizar dirección:", err);
    }
  };

  return (
    <ModalBase onClose={onClose}>
      <div className="relative">
        <button
          onClick={onClose}
          className="absolute right-4 text-gray-500 cursor-pointer hover:text-gray-700 transition text-xl"
          aria-label="Cerrar modal"
        >
          &times;
        </button>
        <h2 className="text-xl font-semibold mb-2">Editar Dirección</h2>

        {/* Dirección actual */}
        {direccion && (
          <p className="text-sm text-gray-600 mb-2">
            Dirección actual: <span className="font-medium">{direccion}</span>
          </p>
        )}

        <input
          type="text"
          value={direccion}
          onChange={(e) => setDireccion(e.target.value)}
          className="border px-4 py-2 w-full rounded mb-4"
          placeholder="Ingresa tu dirección"
        />
        <button
          onClick={handleSave}
          className="bg-blue-600 text-white px-4 py-2 rounded w-full hover:bg-purple-700 transition"
        >
          Guardar
        </button>
      </div>
    </ModalBase>
  );
};

export default ModalDireccion;
