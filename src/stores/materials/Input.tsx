import { Input, Typography } from "antd";
import MaterialWrapper from "../MaterialWrapper";

export function MaterialInput(props: MaterialItemProps) {
  return (
    <div className="flex flex-col gap-2">
      <div className="label">
        <Typography.Text>{props.name}</Typography.Text>
      </div>
      <Input {...props} />
    </div>
  );
}

export function MaterialInputDev(props: MaterialItemProps) {
  return (
    <MaterialWrapper {...props}>
      <MaterialInput {...props} />
    </MaterialWrapper>
  );
}
