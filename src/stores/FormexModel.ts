import { createCustomModel } from "@/common/createModel";

interface FormexModelProps {
  onFinish?: (values: any) => void;
}

export const FormexModel = createCustomModel((props: FormexModelProps) => {
  return props;
});
