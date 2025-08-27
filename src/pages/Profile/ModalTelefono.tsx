import ModalBase from "./ModalBase";

const ModalTelefono = ({ value, onChange, onSave, onClose }) => (
  <ModalBase onClose={onClose}>
    <div className="relative">
    <button
      onClick={() => onClose()}
      className="absolute right-4 text-gray-500 cursor-pointer hover:text-gray-700 transition text-xl"
      aria-label="Cerrar modal"
    >
      &times;
    </button>
    <h2 className="text-xl font-semibold mb-4">Editar Teléfono</h2>
    <input
      type="tel"
      value={value}
      onChange={onChange}
      className="border px-4 py-2 w-full rounded mb-4"
      placeholder="04121234567"
      maxLength={11}
    />
    <button
      onClick={onSave}
      className="bg-blue-600 text-white px-4 py-2 rounded w-full hover:bg-blue-700 transition"
    >
      Guardar
    </button>
    </div>
  </ModalBase>
);

export default ModalTelefono;
