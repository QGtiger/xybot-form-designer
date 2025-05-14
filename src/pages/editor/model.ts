import { createCustomModel } from "../../common/createModel";

export interface EditorModelProps {
  initialSchema: FormexSchema;
}

export const EditorModel = createCustomModel((props: EditorModelProps) => {
  return {
    ...props,
  };
});
