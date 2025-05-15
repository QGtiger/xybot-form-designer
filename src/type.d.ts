interface FormexItem {
  code: string;

  id: string;
  props?: Record<string, any>;
}

interface FormexSchemaV1 {
  version: "1.0";
  title: string;
  subtitle: string;
  background: string;
  formItems: FormexItem[];
  btnText: string;
}

type FormexSchema = FormexSchemaV1;
