import { useDrop } from "react-dnd";

export default function useMaterialDrop(config: {
  id: string;
  accept: string[];
}) {
  const { id, accept } = config;

  const [{ isOver, canDrop }, drop] = useDrop({
    accept: accept,
    drop(item, monitor) {
      // 这里可以处理 drop 的逻辑
      console.log("item", item);
      console.log("monitor", monitor);
      return;
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
      canDrop: !!monitor.canDrop(),
    }),
  });

  return { isOver, canDrop, drop };
}
