import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { Flowbite } from "flowbite-react";
import flowBiteTheme from "./theme/flowBiteTheme";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Flowbite theme={{ theme: flowBiteTheme }}>
      <App />
      <ToastContainer />
    </Flowbite>
  </React.StrictMode>,
);
