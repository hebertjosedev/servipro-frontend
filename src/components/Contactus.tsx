import react from "react";
import "../App.css";
import Alert from "../components/Alert";

const Contactus = () => {
  const [showAlert, setShowAlert] = react.useState(false);
  const [alertMessage, setAlertMessage] = react.useState("Mensaje enviado con éxito.");
  const [alertType, setAlertType] = react.useState<"success" | "error" | "warning" | "info">("success");


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Aquí puedes manejar el envío del formulario, por ejemplo, enviarlo a un servidor
    const form = e.target as HTMLFormElement;

    // Reiniciar el formulario después del envío
    form.reset();

    // Generar una alerta de éxito utilizando el componente Alert
    setShowAlert(true);
    setAlertMessage("Mensaje enviado con éxito.");
    setAlertType("success");
    setTimeout(() => setShowAlert(false), 5000); // Ocultar la alerta después de 5 segundos
  };

  return (
    <>
      <div className="imgconstructor min-h-screen">
        <div className="card bg-white flex flex-col justify-center items-center text-black p-8 max-w-md mx-auto mt-10 shadow-lg rounded-2xl">
          <h2 className="text-2xl font-bold mb-4">Soporte Técnico</h2>
          <form className="w-full flex flex-col gap-4" onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Nombre"
              required
              className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <input
              type="email"
              placeholder="Correo electrónico"
              required
              className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <textarea
              placeholder="Mensaje"
              required
              className="border rounded px-3 py-2 h-24 resize-none focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <button
              type="submit"
              className="bg-blue-600 text-white rounded px-4 py-2 hover:bg-blue-700 transition"
            >
              Enviar
            </button>
          </form>
          <div className="mt-6 text-center text-sm text-gray-600">
            También puedes escribirnos a{" "}
            <a
              href="mailto:contacto@servipro.com"
              className="text-blue-600 underline"
            >
              contacto@servipro.com
            </a>
          </div>
        </div>
      </div>

      {/* Invocar el componente de alerta */}
      <div className="fixed bottom-2 z-50" style={{ left: '50%', transform: 'translateX(-50%)' }}>
        <Alert
          message={alertMessage}
          type={alertType}
          isVisible={showAlert}
          onClose={() => setShowAlert(false)}
        />
      </div>
    </>
  );
};

export default Contactus;
