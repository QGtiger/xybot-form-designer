import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import FormDesignerEditor from "./pages/editor";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <FormDesignerEditor />
  </StrictMode>
);
