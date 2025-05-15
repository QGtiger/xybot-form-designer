import { Input, Typography } from "antd";

export function MaterialInput(props: MaterialItemProps) {
  return (
    <div data-component-id={props.id} className="flex flex-col gap-2">
      <div className="label">
        <Typography.Text>{props.name}</Typography.Text>
      </div>
      <Input {...props} />
    </div>
  );
}
