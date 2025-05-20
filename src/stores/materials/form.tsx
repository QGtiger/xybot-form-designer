import { Form } from "antd";
import { PropsWithChildren } from "react";
import { FormexModel } from "../FormexModel";

export default function CustomForm(
  props: PropsWithChildren<MaterialItemProps>
) {
  const { onFinish } = FormexModel.useModel();
  return (
    <div className="px-4 md:px-10 pt-14 pb-20">
      <Form colon={false} layout="vertical" onFinish={onFinish} {...props}>
        <div className="max-w-[600px] mx-auto">{props.children}</div>
      </Form>
    </div>
  );
}
