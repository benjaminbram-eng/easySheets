import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { GoogleAuthProvider } from "./contexts/GoogleAuthContext";
import "./styles.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <GoogleAuthProvider>
      <App />
    </GoogleAuthProvider>
  </React.StrictMode>
);
