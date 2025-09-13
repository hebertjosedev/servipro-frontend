import { useState } from "react";
import type { Professional } from "../interfaces/Professional";
import {
  FaMapMarkerAlt,
  FaBriefcase,
  FaCheckCircle,
  FaStar,
} from "react-icons/fa";
import axios from "axios";
import { useAuth } from "../services/AuthContext";

interface Props {
  professional: Professional;
}

export const ProfessionalCard = ({ professional }: Props) => {
  const { user } = useAuth();
  const [selectedProfessional, setSelectedProfessional] =
    useState<Professional | null>(null);
  const [problemDescription, setProblemDescription] = useState("");
  const [showModal, setShowModal] = useState(false);

  const handleSubmitRequest = async () => {
    if (!user?.id || !selectedProfessional?.id) {
      console.warn("Faltan datos para enviar la solicitud");
      return;
    }

    await axios.post("servipro-backend-production.up.railway.app/api/v1/requests/request-service", {
      user_id: user.id,
      professional_id: selectedProfessional.id,
      description: problemDescription,
    });

    setShowModal(false);
    setProblemDescription("");
  };
  return (
    <div className="card bg-base-100 shadow-md hover:shadow-xl transition-all duration-300 w-full max-w-sm mx-auto">
      {showModal && selectedProfessional && (
        <dialog open className="modal">
          <div className="modal-box">
            <h2 className="text-lg font-bold mb-2">
              Solicitud para {selectedProfessional.full_name}
            </h2>
            {user && (
              <p className="text-sm text-gray-600 mb-2">
                Enviada por: <strong>{user.full_name}</strong>
              </p>
            )}
            <textarea
              value={problemDescription}
              onChange={(e) => setProblemDescription(e.target.value)}
              placeholder="Describe brevemente tu problema..."
              className="w-full p-2 border rounded"
              rows={4}
            />
            <div className="modal-action">
              <button onClick={handleSubmitRequest} className="btn btn-primary">
                Enviar solicitud
              </button>
              <button
                onClick={() => setShowModal(false)}
                className="btn btn-outline"
              >
                Cancelar
              </button>
            </div>
          </div>
        </dialog>
      )}
      <div className="card-body space-y-2">
        <div className="flex items-center justify-between">
          <h1 className="card-title text-lg font-bold text-primary">
            {professional.full_name}
          </h1>
          {professional.verified && (
            <FaCheckCircle
              className="text-green-500 text-xl"
              title="Verificado"
            />
          )}
        </div>

        <div className="flex items-center gap-2 text-sm text-gray-600">
          <FaBriefcase />
          <span>{professional.profession}</span>
        </div>

        <div className="flex items-center gap-2 text-sm text-gray-600">
          <FaMapMarkerAlt />
          <span>{professional.service_area}</span>
        </div>

        <div className="flex items-center gap-2 text-sm text-gray-600">
          <FaStar />
          <span>{professional.experience_years} años de experiencia</span>
        </div>

        {professional.bio && (
          <p className="text-sm text-gray-500 italic mt-2">
            “{professional.bio}”
          </p>
        )}

        <div className="card-actions mt-4">
          <button
            onClick={() => {
              setSelectedProfessional(professional);
              setShowModal(true);
            }}
            className="btn btn-outline btn-sm"
          >
            Solicitar servicio
          </button>
        </div>
      </div>
    </div>
  );
};
