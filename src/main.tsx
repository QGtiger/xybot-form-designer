import { createRoot } from "react-dom/client";
// import FormDesignerEditor from "./pages/editor";
import DndCard from "./pages/dndcard";
import FormDesignerEditor from "./pages/editor";
import { ConfigProvider } from "antd";

createRoot(document.getElementById("root")!).render(
  <ConfigProvider theme={{ token: { colorPrimary: "#7f70f5" } }}>
    <FormDesignerEditor />
  </ConfigProvider>
);
