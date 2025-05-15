import { createRoot } from "react-dom/client";
// import FormDesignerEditor from "./pages/editor";
import DndCard from "./pages/dndcard";
import FormDesignerEditor from "./pages/editor";
import { ConfigProvider } from "antd";

const testSchema: FormexSchemaV1 = {
  version: "1.0",
  title: "表单标题",
  subtitle: "表单副标题",
  background:
    "https://winrobot-pub-a-1302949341.cos.ap-shanghai.myqcloud.com/image/20250514202954/395c74ad8b4de6e1b7a38247700842aa.png",
  formItems: [
    {
      code: "input",
      id: "22",
      props: {
        name: "姓名",
        placeholder: "请输入姓名",
      },
    },
    {
      code: "input",
      id: "223",
      props: {
        name: "姓名22",
        placeholder: "请输入姓名",
      },
    },
  ],
  btnText: "提交",
};

createRoot(document.getElementById("root")!).render(
  <ConfigProvider theme={{ token: { colorPrimary: "#7f70f5" } }}>
    <FormDesignerEditor initialSchema={testSchema} />
  </ConfigProvider>
);
