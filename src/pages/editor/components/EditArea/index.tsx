import PreviewDevFormex from "./PreviewDevFormex";

export default function EditArea() {
  return (
    <div className="flex flex-col h-full ">
      <div className=" h-[40px] flex-shrink-0 bg-white border-b border-gray-300  flex items-center justify-center text-sm font-semibold text-gray-600">
        预览
      </div>
      <div className="area flex justify-center h-1 flex-1 overflow-auto p-10">
        <div className="device rounded-2xl bg-white  border border-gray-200 shadow-md w-[375px] min-h-[667px] overflow-hidden">
          <PreviewDevFormex />
        </div>
      </div>
    </div>
  );
}
