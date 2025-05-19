import { Form } from "antd";
import { PropsWithChildren } from "react";

export default function CustomForm(
  props: PropsWithChildren<MaterialItemProps>
) {
  return (
    <div className="px-10 py-4">
      <Form
        colon={false}
        layout="vertical"
        onFinish={() => {
          console.log("submit");
        }}
        {...props}
      >
        <div className="max-w-[600px] mx-auto">{props.children}</div>
      </Form>
    </div>
  );
}
