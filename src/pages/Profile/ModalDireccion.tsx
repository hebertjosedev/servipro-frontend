import ModalBase from "./ModalBase";

const ModalDireccion = ({ value, onChange, onSave, onClose }) => {
  return (
    <>
      <ModalBase onClose={onClose}>
        <div className="relative">
          <button
            onClick={() => onClose()}
            className="absolute right-4 text-gray-500 cursor-pointer hover:text-gray-700 transition text-xl"
            aria-label="Cerrar modal"
          >
            &times;
          </button>
          <h2 className="text-xl font-semibold mb-4">Editar Dirección</h2>
          <input
            type="text"
            value={value}
            onChange={onChange}
            className="border px-4 py-2 w-full rounded mb-4"
            placeholder="Ingresa tu dirección"
          />
          <button
            onClick={onSave}
            className="bg-blue-600 text-white px-4 py-2 rounded w-full hover:bg-purple-700 transition"
          >
            Guardar
          </button>
        </div>
      </ModalBase>
    </>
  );
};

export default ModalDireccion;
