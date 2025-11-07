import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./style.css";
import AOS from "aos";
import "aos/dist/aos.css";

AOS.init({ duration: 700, once: true, easing: "ease-in-out" });

const root = createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);