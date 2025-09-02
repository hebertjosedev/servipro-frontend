import { createBrowserRouter, RouterProvider } from "react-router";

// Estilos
import "./App.css";

// Páginas
import Login from "./pages/Login/Login";
import Home from "./pages/Home";
import Overlay from "./Overlay/Overlay";
import Register from "./pages/Login/Register";
import Services from "./pages/Services";
import Contactus from "./pages/Contactus";
import Electrician from "./pages/Electrician";
import Cleaning from "./pages/Cleaning";
import Technology from "./pages/Technology";
import Electronic from "./pages/Electronic";
import Carpentry from "./pages/Carpentry";
import Plumbing from "./pages/Plumbing";

// Servicios
import { AuthProvider } from "./services/AuthContext";
import Profile from "./pages/Profile/Profile";
import RequestedServices from "./pages/RequestedServices";
import { ProfessionalAuthProvider } from "./services/ProfessionalAuthContext";

function App() {
  const router = createBrowserRouter([
    {
      path: "",
      element: <Overlay />,
      children: [
        {
          index: true,
          element: <Home />,
        },
        {
          path: "login",
          element: <Login />,
        },
        {
          path: "register",
          element: <Register />,
        },
        {
          path: "profile",
          element: <Profile />,
        },
        {
          path: "services",
          element: <Services />,
        },
        {
          path: "requested-services",
          element: <RequestedServices />,
        },
        {
          path: "contactus",
          element: <Contactus />,
        },
        {
          path: "electrician",
          element: <Electrician />,
        },
        {
          path: "cleaning",
          element: <Cleaning />,
        },
        {
          path: "technology",
          element: <Technology />,
        },
        {
          path: "electronic",
          element: <Electronic />,
        },
        {
          path: "carpentry",
          element: <Carpentry />,
        },
        {
          path: "plumbing",
          element: <Plumbing />,
        },
      ],
    },
  ]);

  return (
    <>
      <AuthProvider>
        <ProfessionalAuthProvider>
        <RouterProvider router={router} />
        </ProfessionalAuthProvider>
      </AuthProvider>
    </>
  );
}

export default App;
