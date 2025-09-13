import { createBrowserRouter, RouterProvider } from "react-router-dom";

// Estilos
import "./App.css";

// Páginas
import Login from "./pages/Login/Login";
import Home from "./components/Home";
import Overlay from "./Overlay/Overlay";
import Register from "./pages/Login/Register";
import Services from "./components/Services";
import Contactus from "./components/Contactus";
import Electrician from "./components/Electrician";
import Cleaning from "./components/Cleaning";
import Technology from "./components/Technology";
import Electronic from "./components/Electronic";
import Carpentry from "./components/Carpentry";
import Plumbing from "./components/Plumbing";

// Servicios
import { AuthProvider } from "./services/AuthContext";
import Profile from "./pages/Profile/Profile";
import RequestedServices from "./components/RequestedServices";
import { ProfessionalAuthProvider } from "./services/ProfessionalAuthContext";
import UserDashboard from "./components/UserDashboard";
import AcceptedServices from "./components/AcceptedServices";

function App() {
  return (
    <AuthProvider>
      <ProfessionalAuthProvider>
        <RouterProvider
          router={createBrowserRouter([
            {
              path: "",
              element: <Overlay />,
              children: [
                { index: true, element: <Home /> },
                { path: "login", element: <Login /> },
                { path: "register", element: <Register /> },
                { path: "profile", element: <Profile /> },
                { path: "services", element: <Services /> },
                { path: "services-requests", element: <UserDashboard /> },
                { path: "requested-services", element: <RequestedServices /> },
                { path: "requested-services-accept", element: <AcceptedServices /> },
                { path: "contactus", element: <Contactus /> },
                { path: "electrician", element: <Electrician /> },
                { path: "cleaning", element: <Cleaning /> },
                { path: "technology", element: <Technology /> },
                { path: "electronic", element: <Electronic /> },
                { path: "carpentry", element: <Carpentry /> },
                { path: "plumbing", element: <Plumbing /> },
              ],
            },
          ])}
        />
      </ProfessionalAuthProvider>
    </AuthProvider>
  );
}

export default App;
