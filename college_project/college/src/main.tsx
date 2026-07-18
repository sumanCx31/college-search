// index.tsx
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import RouterConfig from "./config/router.config.tsx";
import './../assets/index.css'
import { Navbar } from "./component/navbar.tsx";
import { Footer } from "./component/footer.tsx";
// REMOVE BrowserRouter from here if you have it!

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Navbar />
    <RouterConfig />
    <Footer />
  </StrictMode>
);