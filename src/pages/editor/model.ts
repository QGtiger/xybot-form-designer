import { useReactive } from "ahooks";
import { createCustomModel } from "../../common/createModel";

export interface EditorModelProps {
  initialSchema?: FormexSchema;
}

const defaultSchema: FormexSchema = {
  version: "1.0",
  title: "表单标题",
  subtitle: "表单副标题",
  background:
    "https://winrobot-pub-a-1302949341.cos.ap-shanghai.myqcloud.com/image/20250514202954/395c74ad8b4de6e1b7a38247700842aa.png",
  formItems: [],
  btnText: "提交",
};

export const EditorModel = createCustomModel((props: EditorModelProps) => {
  const formexModel = useReactive({
    schema: props.initialSchema || defaultSchema,
  });

  return {
    ...props,
    formexModel,
    formexSchema: formexModel.schema,
  };
});
