import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Comp from "./Components/Comp.tsx";
const router = createBrowserRouter([
    {
        path: "/",
        element: <App />
    },
    {
        path: "/component",
        element: <Comp />
    }
]);
ReactDOM.createRoot(document.getElementById("root")!).render(
  <RouterProvider router={router} />
);
