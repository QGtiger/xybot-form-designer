import { createRoot } from "react-dom/client";
// import FormDesignerEditor from "./pages/editor";
import DndCard from "./pages/dndcard";
import FormDesignerEditor from "./pages/editor";
import { ConfigProvider } from "antd";
import { SortableListDemo } from "./pages/sortableList";
import { DndkitDemo } from "./pages/dndkitdemo";

createRoot(document.getElementById("root")!).render(
  <ConfigProvider theme={{ token: { colorPrimary: "#7f70f5" } }}>
    {/* <FormDesignerEditor /> */}
    {/* <SortableListDemo /> */}
    <DndkitDemo />
  </ConfigProvider>
);
