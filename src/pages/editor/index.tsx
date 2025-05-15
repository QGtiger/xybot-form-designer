import Material from "./components/Material";
import EditArea from "./components/EditArea";
import Setting from "./components/Setting";

import Header from "./components/Header";

import { Allotment } from "allotment";
import "allotment/dist/style.css";
import { useEffect } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useSchemaStore } from "@/stores/useSchemaStore";
import { ConfigProvider } from "antd";

import zhCN from "antd/locale/zh_CN";

export default function FormexDesigner(props: {
  initialSchema?: FormexSchema;
}) {
  const { initialSchema } = props;
  const { setSchema, selectedComponentId } = useSchemaStore();

  useEffect(() => {
    initialSchema && setSchema(initialSchema);
  }, []);

  useEffect(() => {
    const ele = document.getElementById("allotment-container");
    if (ele) {
      setTimeout(() => {
        ele.style.opacity = "1";
      }, 50);
    }
  }, []);

  return (
    <ConfigProvider locale={zhCN}>
      <DndProvider backend={HTML5Backend}>
        <div className="h-[100vh] w-[100vw] flex flex-col">
          <Header />
          <Allotment
            defaultSizes={[100]}
            id="allotment-container"
            className="opacity-0"
          >
            <Allotment.Pane preferredSize={280} maxSize={400} minSize={200}>
              <Material />
            </Allotment.Pane>
            <Allotment.Pane className="bg-[#e5e8ec]">
              <EditArea />
            </Allotment.Pane>
            <Allotment.Pane preferredSize={300} maxSize={450} minSize={260}>
              <div className="p-4 px-6">
                <Setting key={selectedComponentId} />
              </div>
            </Allotment.Pane>
          </Allotment>
        </div>
      </DndProvider>
    </ConfigProvider>
  );
}
