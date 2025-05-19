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
import { App, ConfigProvider } from "antd";

import zhCN from "antd/locale/zh_CN";

export default function FormexDesigner(props: {
  initialSchema?: FormexSchema;
  height?: number;
  onChange?: (schema: FormexSchema) => void;
}) {
  const { initialSchema, height, onChange } = props;
  const { setSchema, selectedComponentId, schema } = useSchemaStore();

  useEffect(() => {
    initialSchema && setSchema(initialSchema);
  }, []);

  useEffect(() => {
    onChange?.(schema);
  }, [schema, onChange]);

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
      <App>
        <DndProvider backend={HTML5Backend}>
          <div
            className="h-[100vh] w-[100%] flex flex-col"
            style={{
              height: height ? `${height}px` : "100vh",
            }}
          >
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
              <Allotment.Pane preferredSize={340} maxSize={450} minSize={300}>
                <Setting key={selectedComponentId} />
              </Allotment.Pane>
            </Allotment>
          </div>
        </DndProvider>
      </App>
    </ConfigProvider>
  );
}
