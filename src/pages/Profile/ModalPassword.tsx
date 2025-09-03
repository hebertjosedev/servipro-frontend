import { useState } from "react";
import ModalBase from "./ModalBase";
import { useAuth } from "../../services/AuthContext";
import { useProfessionalAuth } from "../../services/ProfessionalAuthContext";

const ModalPassword = ({ onClose }: { onClose: () => void }) => {
  const { token: userToken} = useAuth();
  const { token: professionalToken } = useProfessionalAuth();

  const activeToken = userToken || professionalToken;

  const endpoint = "http://localhost:8000/api/v1/auth/change-password";


  const [current, setCurrent] = useState("");
  const [newPass, setNewPass] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    if (!current || !newPass || !confirm) {
      alert("Completa todos los campos.");
      return;
    }

    if (newPass.length < 6) {
      alert("La nueva contraseña debe tener al menos 6 caracteres.");
      return;
    }

    if (newPass !== confirm) {
      alert("Las contraseñas no coinciden.");
      return;
    }

    if (!endpoint || !activeToken) {
      alert("No se pudo determinar el tipo de sesión.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${activeToken}`,
        },
        body: JSON.stringify({
          current_password: current,
          new_password: newPass,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        alert("Contraseña actualizada con éxito.");
        onClose();
      } else {
        alert(data.detail || "Error al cambiar la contraseña.");
      }
    } catch (error) {
      console.error("Error al cambiar la contraseña:", error);
      alert("Hubo un problema al conectar con el servidor.");
    } finally {
      setLoading(false);
      setCurrent("");
      setNewPass("");
      setConfirm("");
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
        <h2 className="text-xl font-semibold mb-4">Cambiar Contraseña</h2>
        <input
          type="password"
          value={current}
          onChange={(e) => setCurrent(e.target.value)}
          className="border px-4 py-2 w-full rounded mb-2"
          placeholder="Contraseña actual"
        />
        <input
          type="password"
          value={newPass}
          onChange={(e) => setNewPass(e.target.value)}
          className="border px-4 py-2 w-full rounded mb-2"
          placeholder="Nueva contraseña"
        />
        <input
          type="password"
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
          className="border px-4 py-2 w-full rounded mb-4"
          placeholder="Confirmar nueva contraseña"
        />
        <button
          onClick={handleSave}
          disabled={loading}
          className={`px-4 py-2 w-full rounded transition ${
            loading
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : "bg-blue-600 text-white hover:bg-blue-700"
          }`}
        >
          {loading ? "Guardando..." : "Guardar"}
        </button>
      </div>
    </ModalBase>
  );
};

export default ModalPassword;
