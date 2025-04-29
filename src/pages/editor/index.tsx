import { Allotment } from "allotment";
import Material from "./components/Material";
import EditArea from "./components/EditArea";
import Setting from "./components/Setting";

import "allotment/dist/style.css";

export default function FormDesignerEditor() {
  return (
    <div className="h-[100vh] w-[100vw] flex flex-col">
      <Allotment defaultSizes={[100]}>
        <Allotment.Pane preferredSize={240} maxSize={300} minSize={200}>
          <Material />
        </Allotment.Pane>
        <Allotment.Pane>
          <EditArea />
        </Allotment.Pane>
        <Allotment.Pane preferredSize={300} maxSize={500} minSize={300}>
          <Setting />
        </Allotment.Pane>
      </Allotment>
    </div>
  );
}
