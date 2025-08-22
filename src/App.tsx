import { createBrowserRouter, RouterProvider } from "react-router";

// Estilos
import "./App.css";

// Páginas
import Login from "./pages/Login";
import Home from "./pages/Home";
import Overlay from "./Overlay/Overlay";
import Register from "./pages/Register";
import Services from "./pages/Services";
import Contactus from "./pages/Contactus"
import Electrician from "./pages/Electrician";
import Cleaning from "./pages/Cleaning";
import Technology from "./pages/Technology";
import Electronic from "./pages/Electronic";
import Carpentry from "./pages/Carpentry";
import Plumbing from "./pages/Plumbing";

// Servicios
import { AuthProvider } from "./services/AuthContext";

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
          path: "services",
          element: <Services />,
        },
        {
          path:"contactus",
          element: <Contactus/>
        },
        {
          path:"electrician",
          element:<Electrician/>
        },
        {
          path:"cleaning",
          element:<Cleaning/>
        },
        {
          path:"technology",
          element:<Technology/>
        },
        {
          path:"electronic",
          element:<Electronic/>
        },
        {
          path:"carpentry",
          element:<Carpentry/>
        },
        {
          path:"plumbing",
          element:<Plumbing/>
        },
      ],
    },
  ]);

  return (
    <>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </>
  );
}

export default App;
