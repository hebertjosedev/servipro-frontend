import { useEffect, useState } from "react";
import { IoCall, IoExit, IoHome, IoKey, IoPencilSharp } from "react-icons/io5";
import ModalDireccion from "./ModalDireccion";
import ModalTelefono from "./ModalTelefono";
import ModalPassword from "./ModalPassword";
import { useAuth } from "../../services/AuthContext";

const Profile = () => {
  const { user, logout } = useAuth();
  const [name, setName] = useState(user?.full_name || "");
  const [telefono, setTelefono] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [direccion, setDireccion] = useState("Av. fuerzas armadas");

  const handleSaveDireccion = async () => {
    await fetch("/api/update-direccion", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ direccion }),
    });
    setActiveModal(null);
  };

  const handleSaveTelefono = () => {
    const telefonoValido = /^0(412|414|416|424|426)\d{7}$/.test(telefono);

    if (!telefonoValido) {
      alert("Formato de teléfono inválido. Usa un número como 04121234567.");
      return;
    }

    console.log("Teléfono guardado:", telefono);
    setActiveModal(null);
  };

const handleSavePassword = async () => {
  if (!currentPassword || !newPassword || !confirmPassword) {
    alert("Completa todos los campos.");
    return;
  }

  if (newPassword.length < 6) {
    alert("La nueva contraseña debe tener al menos 6 caracteres.");
    return;
  }

  if (newPassword !== confirmPassword) {
    alert("Las contraseñas no coinciden.");
    return;
  }

  try {
    const res = await fetch("/api/change-password", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // Si usas autenticación con JWT, incluye el token aquí:
        // Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        current_password: currentPassword,
        new_password: newPassword,
      }),
    });

    const data = await res.json();

    if (res.ok) {
      alert("Contraseña actualizada con éxito.");
      setActiveModal(null);
    } else {
      alert(data.detail || "Error al cambiar la contraseña.");
    }
  } catch (error) {
    console.error("Error al cambiar la contraseña:", error);
    alert("Hubo un problema al conectar con el servidor.");
  }

  // Limpieza de campos
  setCurrentPassword("");
  setNewPassword("");
  setConfirmPassword("");
};


  useEffect(() => {
    if (!activeModal) {
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
      setTelefono("");
      setDireccion("");
    }
  }, [activeModal]);

  return (
    <>
      {activeModal === "direccion" && (
        <ModalDireccion
          value={direccion}
          onChange={(e) => setDireccion(e.target.value)}
          onSave={handleSaveDireccion}
          onClose={() => setActiveModal(null)}
        />
      )}

      {activeModal === "telefono" && (
        <ModalTelefono
          value={telefono}
          onChange={(e) => setTelefono(e.target.value)}
          onSave={handleSaveTelefono}
          onClose={() => setActiveModal(null)}
        />
      )}

      {activeModal === "password" && (
        <ModalPassword
          current={currentPassword}
          newPass={newPassword}
          confirm={confirmPassword}
          onChange={(field, value) => {
            if (field === "current") setCurrentPassword(value);
            if (field === "newPass") setNewPassword(value);
            if (field === "confirm") setConfirmPassword(value);
          }}
          onSave={handleSavePassword}
          onClose={() => setActiveModal(null)}
        />
      )}

      <div className="flex flex-col gap-3 items-center justify-center p-8">
        {/* <div className="mx-auto max-w-md overflow-hidden rounded-xl bg-white shadow-md md:max-w-2xl border-4 border-purple-500"> */}
        <div className="flex flex-col items-center p-6 min-w-100 mx-auto max-w-md overflow-hidden rounded-xl bg-white shadow-md md:max-w-2xl">
          <div className="avatar">
            <div className="ring-primary ring-offset-base-100 w-24 rounded-full ring-2 ring-offset-2">
              <img src="https://img.daisyui.com/images/profile/demo/spiderperson@192.webp" />
            </div>
          </div>
          <div className="flex flex-col items-center justify-center">
            <h2 className="font-bold">{name}</h2>
            <span className="font-medium text-gray-600">
              Nivel: <span className="text-yellow-500">Oro</span>
            </span>
            <progress
              className="progress progress-warning w-35"
              value="40"
              max="100"
            ></progress>
          </div>
        </div>
        <div className="flex flex-col items-center p-6 min-w-100 mx-auto max-w-md overflow-hidden rounded-xl bg-white shadow-md md:max-w-2xl">
          <div className="border-b-1 border-gray-200 border-t-0 border-l-0 border-r-0 w-full">
            <div className="flex items-center justify-between w-full pb-2">
              <div className="">
                <h3 className="font-bold">Datos del perfil</h3>
              </div>
              <div className="border-b-1 border-black-500 border-t-0 border-l-0 border-r-0">
                <span className="">
                  <IoPencilSharp />
                </span>
              </div>
            </div>
          </div>
          <div className="border-b-1 border-gray-200 border-t-0 border-l-0 border-r-0 w-full">
            <div
              className="flex items-center w-full pb-2 pt-2 cursor-pointer hover:bg-gray-100 transition rounded"
              onClick={() => {
                setActiveModal("direccion");
              }}
            >
              <div className="pr-2">
                <span className="">
                  <IoHome />
                </span>
              </div>
              <div className="">
                <p className="">Dirección guardada</p>
              </div>
            </div>
          </div>
          <div className="border-b-1 border-gray-200 border-t-0 border-l-0 border-r-0 w-full">
            <div
              className="flex items-center w-full pb-2 pt-2 cursor-pointer hover:bg-gray-100 transition rounded"
              onClick={() => {
                setActiveModal("telefono");
              }}
            >
              <div className="pr-2">
                <span className="">
                  <IoCall />
                </span>
              </div>
              <div className="">
                <p className="">Teléfono</p>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center p-6 min-w-100 mx-auto max-w-md overflow-hidden rounded-xl bg-white shadow-md md:max-w-2xl">
          <div className="border-b-1 border-gray-200 border-t-0 border-l-0 border-r-0 w-full">
            <div className="flex items-center justify-between w-full pb-2">
              <div className="">
                <h3 className="font-bold">información de la cuenta</h3>
              </div>
            </div>
          </div>
          <div className="border-b-1 border-gray-200 border-t-0 border-l-0 border-r-0 w-full">
            <div
              className="flex items-center w-full pb-2 pt-2 cursor-pointer hover:bg-gray-100 transition rounded"
              onClick={() => {
                setActiveModal("password");
              }}
            >
              <div className="pr-2">
                <span className="">
                  <IoKey />
                </span>
              </div>
              <div className="">
                <p className="">Cambiar Contraseña</p>
              </div>
            </div>
          </div>
          <div className="border-b-1 border-gray-200 border-t-0 border-l-0 border-r-0 w-full">
            <div 
            className="flex items-center w-full pb-2 pt-2 cursor-pointer hover:bg-gray-100 transition rounded"
            onClick={() => {
                logout()
                setName("")
              }}
            >
              <div className="pr-2">
                <span className="">
                  <IoExit />
                </span>
              </div>
              <div className="">
                <p className="">Cerrar sesión</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
