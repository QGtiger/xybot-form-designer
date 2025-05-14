import PreviewFormex from "../../../../components/PreviewFormex";

const testSchema: FormexSchemaV1 = {
  version: "1.0",
  title: "表单标题",
  subtitle: "表单副标题",
  background:
    "https://winrobot-pub-a-1302949341.cos.ap-shanghai.myqcloud.com/image/20250514202954/395c74ad8b4de6e1b7a38247700842aa.png",
  formItems: [],
  btnText: "提交",
};

export default function EditArea() {
  return (
    <div className="flex flex-col">
      <div className="h-[40px] bg-white border-b border-gray-300  flex items-center justify-center text-sm font-semibold text-gray-600">
        预览
      </div>
      <div className="area flex justify-center">
        <div className="device mt-10 rounded-2xl bg-white  border border-gray-200 shadow-md w-[375px] h-[667px] overflow-hidden">
          <PreviewFormex schema={testSchema} />
        </div>
      </div>
    </div>
  );
}
