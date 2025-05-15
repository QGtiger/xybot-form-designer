import { PropsWithChildren, useEffect, useRef } from "react";
import { useMaterialStore } from "../useMaterialStore";
import { useDrop } from "react-dnd";
import { useMount } from "ahooks";
import { useSchemaStore } from "../useSchemaStore";

export default function MaterialWrapper(
  props: PropsWithChildren<MaterialItemProps>
) {
  const { materialKeys } = useMaterialStore();

  const { setOverComponentId, setOverComponentPlacement, insertFormItem } =
    useSchemaStore();
  const ref = useRef<HTMLDivElement>(null);
  const [{ isOver }, drop] = useDrop({
    accept: materialKeys,
    drop(item: any, monitor) {
      if (!ref.current) return;

      if (monitor.didDrop()) {
        return;
      }
      insertFormItem(item);
    },
    hover(item: any, monitor) {
      if (!ref.current) return;

      const hoverBoundingRect = ref.current.getBoundingClientRect();
      const hoverThreshold =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = clientOffset!.y - hoverBoundingRect.top;

      setOverComponentPlacement(
        hoverClientY < hoverThreshold ? "top" : "bottom"
      );
    },
    collect: (monitor) => {
      return {
        isOver: !!monitor.isOver(),
        canDrop: !!monitor.canDrop(),
      };
    },
  });

  useMount(() => {
    drop(ref);
  });

  useEffect(() => {
    setOverComponentId(isOver ? props.id : "");
  }, [isOver, setOverComponentId, props.id]);

  return (
    <div ref={ref} data-component-id={props.id} className=" cursor-pointer">
      {props.children}
    </div>
  );
}
