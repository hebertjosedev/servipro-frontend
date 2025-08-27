import ModalBase from "./ModalBase";

const ModalPassword = ({
  current,
  newPass,
  confirm,
  onChange,
  onSave,
  onClose,
}) => (
  <ModalBase onClose={onClose}>
    <div className="relative">
      <button
        onClick={() => onClose()}
        className="absolute right-4 text-gray-500 cursor-pointer hover:text-gray-700 transition text-xl"
        aria-label="Cerrar modal"
      >
        &times;
      </button>
      <h2 className="text-xl font-semibold mb-4">Cambiar Contraseña</h2>
      <input
        type="password"
        value={current}
        onChange={(e) => onChange("current", e.target.value)}
        className="border px-4 py-2 w-full rounded mb-2"
        placeholder="Contraseña actual"
      />
      <input
        type="password"
        value={newPass}
        onChange={(e) => onChange("newPass", e.target.value)}
        className="border px-4 py-2 w-full rounded mb-2"
        placeholder="Nueva contraseña"
      />
      <input
        type="password"
        value={confirm}
        onChange={(e) => onChange("confirm", e.target.value)}
        className="border px-4 py-2 w-full rounded mb-4"
        placeholder="Confirmar nueva contraseña"
      />
      <button
        onClick={onSave}
        className="bg-blue-600 text-white px-4 py-2 rounded w-full hover:bg-red-700 transition"
      >
        Guardar
      </button>
    </div>
  </ModalBase>
);

export default ModalPassword;
