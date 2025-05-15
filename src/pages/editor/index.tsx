import Material from "./components/Material";
import EditArea from "./components/EditArea";
import Setting from "./components/Setting";

import Header from "./components/Header";

import { Allotment } from "allotment";
import "allotment/dist/style.css";
import { useEffect } from "react";
import { EditorModel, EditorModelProps } from "./model";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

function FormexDesigner() {
  useEffect(() => {
    const ele = document.getElementById("allotment-container");
    if (ele) {
      setTimeout(() => {
        ele.style.opacity = "1";
      }, 50);
    }
  }, []);

  return (
    <div className="h-[100vh] w-[100vw] flex flex-col">
      <Header />
      <Allotment
        defaultSizes={[100]}
        id="allotment-container"
        className="opacity-0"
      >
        <Allotment.Pane preferredSize={280} maxSize={360} minSize={200}>
          <Material />
        </Allotment.Pane>
        <Allotment.Pane className="bg-[#e5e8ec]">
          <EditArea />
        </Allotment.Pane>
        <Allotment.Pane preferredSize={300} maxSize={500} minSize={260}>
          <Setting />
        </Allotment.Pane>
      </Allotment>
    </div>
  );
}

export default function FormDesignerEditor(props: EditorModelProps) {
  return (
    <DndProvider backend={HTML5Backend}>
      <EditorModel.Provider value={props}>
        <FormexDesigner />
      </EditorModel.Provider>
    </DndProvider>
  );
}
