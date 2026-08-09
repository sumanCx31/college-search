// index.tsx
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import RouterConfig from "./config/router.config.tsx";
import './../assets/index.css'

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterConfig />
  </StrictMode>
);