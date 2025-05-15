import { useMaterialStore } from "@/stores/useMaterialStore";
import { useSchemaStore } from "@/stores/useSchemaStore";
import { Form, Input, Select } from "antd";

function renderFormElememt(setter: Setter) {
  const { type, props } = setter;

  if (type === "input") {
    return <Input placeholder="请输入" {...props} variant="filled" />;
  }
}

export default function Setting() {
  const {
    selectedComponentId,
    getMaterialItemByComponentId,
    getFormexItemByComponentId,
  } = useSchemaStore();
  const { materialMap } = useMaterialStore();
  const materialItem = getMaterialItemByComponentId(
    selectedComponentId,
    materialMap
  );
  const formexItem = getFormexItemByComponentId(selectedComponentId);
  if (!materialItem || !formexItem) {
    return <div>没有选中任何组件</div>;
  }

  const { props } = formexItem;
  const { defaultProps, configSetter } = materialItem;
  if (!configSetter) {
    return <div>没有配置项</div>;
  }
  return (
    <Form
      layout="vertical"
      initialValues={{
        ...defaultProps,
        ...props,
      }}
    >
      {configSetter.map((it) => {
        return (
          <Form.Item key={it.name} name={it.name} label={it.label}>
            {renderFormElememt(it)}
          </Form.Item>
        );
      })}
    </Form>
  );
}
