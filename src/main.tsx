import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
// import FormDesignerEditor from "./pages/editor";
import DndCard from "./pages/dndcard";

createRoot(document.getElementById("root")!).render(<DndCard />);
