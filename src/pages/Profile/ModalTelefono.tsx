import { useState } from "react";
import axios from "axios";
import { useAuth } from "../../services/AuthContext";
import { useProfessionalAuth } from "../../services/ProfessionalAuthContext";
import ModalBase from "./ModalBase";
import type { ModalTelefonoProps } from "../../interfaces/ModalTelefonoProps";

const ModalTelefono = ({ onClose }:ModalTelefonoProps) => {
  const { user, token: userToken, setUser } = useAuth();
  const { professional, token: professionalToken, setProfessional } = useProfessionalAuth();

  const isUser = !!user;
  const isProfessional = !!professional;

  const [telefono, setTelefono] = useState(
    user?.phone || professional?.phone || ""
  );

  const endpoint = isUser
    ? "https://servipro-backend-production.up.railway.app/api/v1/users/update-contact"
    : isProfessional
    ? "https://servipro-backend-production.up.railway.app/api/v1/professionals/update-contact"
    : null;

  const activeToken = userToken || professionalToken;

  const handleSave = async () => {
    if (!endpoint || !activeToken) return;

    try {
      const res = await axios.put(
        endpoint,
        { phone: telefono },
        {
          headers: {
            Authorization: `Bearer ${activeToken}`,
          },
        }
      );

      if (isUser) {
        setUser(res.data);
      } else if (isProfessional) {
        setProfessional(res.data);
      }

      onClose();
    } catch (err) {
      console.error("Error al actualizar teléfono:", err);
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
        <h2 className="text-xl font-semibold mb-4">Editar Teléfono</h2>
        <input
          type="tel"
          value={telefono}
          onChange={(e) => setTelefono(e.target.value)}
          className="border px-4 py-2 w-full rounded mb-4"
          placeholder="04121234567"
          maxLength={11}
        />
        <button
          onClick={handleSave}
          className="bg-blue-600 text-white px-4 py-2 rounded w-full hover:bg-blue-700 transition"
        >
          Guardar
        </button>
      </div>
    </ModalBase>
  );
};

export default ModalTelefono;
