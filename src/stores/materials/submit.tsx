import { Button } from "antd";

export default function Submit(
  props: MaterialItemProps<{
    text: string;
  }>
) {
  return (
    <Button type="primary" htmlType="submit">
      {props.text}
    </Button>
  );
}
