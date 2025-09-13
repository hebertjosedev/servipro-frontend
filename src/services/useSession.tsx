import { useNavigate } from "react-router";
import { useAuth } from "./AuthContext";
import { useProfessionalAuth } from "./ProfessionalAuthContext";

export const useSession = () => {

  const navigate = useNavigate()
  const {
    user,
    token: userToken,
    logout: logoutUser,
    setUser,
  } = useAuth();

  const {
    professional,
    token: professionalToken,
    logout: logoutProfessional,
    setProfessional,
  } = useProfessionalAuth();

  const role = user ? "user" : professional ? "professional" : null;
  const profile = user || professional;
  const token = userToken || professionalToken;

  const logoutGlobal = () => {
    logoutUser();
    logoutProfessional();
    setUser(null);
    setProfessional(null);
    localStorage.removeItem("userToken");
    localStorage.removeItem("userData");
    localStorage.removeItem("professionalToken");
    localStorage.removeItem("professionalData");
    navigate('/login')
  };

  return { role, profile, token, logoutGlobal };
};
