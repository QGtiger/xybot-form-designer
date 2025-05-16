interface FormexItem {
  code: string;

  id: string;
  props?: Record<string, any>;

  children?: FormexItem[];
}

interface FormexSchemaV1 {
  version: "1.0";
  formItems: FormexItem[];
}

type FormexSchema = FormexSchemaV1;
