import { useState } from "react";
import { useAuth } from "../../services/AuthContext";
import ModalBase from "./ModalBase";
import axios from "axios";

const ModalTelefono = ({ onClose }) => {
  const { user, token, setUser } = useAuth();
  const [telefono, setTelefono] = useState(user?.phone || "");

  const handleSave = async () => {
    try {
      const res = await axios.put(
        "http://localhost:8000/api/v1/users/update-phone",
        { phone: telefono },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setUser(res.data); // actualiza el contexto
      onClose(); // cierra el modal
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
