import PreviewFormex from "../../../../components/PreviewFormex";
import { EditorModel } from "../../model";

export default function EditArea() {
  const { formexSchema } = EditorModel.useModel();
  return (
    <div className="flex flex-col">
      <div className="h-[40px] bg-white border-b border-gray-300  flex items-center justify-center text-sm font-semibold text-gray-600">
        预览
      </div>
      <div className="area flex justify-center">
        <div className="device mt-10 rounded-2xl bg-white  border border-gray-200 shadow-md w-[375px] h-[667px] overflow-hidden">
          <PreviewFormex schema={formexSchema} />
        </div>
      </div>
    </div>
  );
}
