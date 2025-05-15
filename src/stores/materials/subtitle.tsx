import { Typography } from "antd";

export default function SubTitle(
  props: MaterialItemProps<{
    text: string;
  }>
) {
  return (
    <div className="my-4">
      <Typography.Text type="secondary">{props.text}</Typography.Text>
    </div>
  );
}
