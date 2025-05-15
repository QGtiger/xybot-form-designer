import { PropsWithChildren, useEffect, useRef } from "react";
import { useMaterialStore } from "../useMaterialStore";
import { useDrag, useDrop } from "react-dnd";
import { useMount } from "ahooks";
import { useSchemaStore } from "../useSchemaStore";

interface ItemType {
  code: string;
  dragType?: "move" | "add";
  id: string;
}

export default function MaterialWrapper(
  props: PropsWithChildren<MaterialItemProps>
) {
  const { materialKeys, materialMap, getMaterialItemByCode } =
    useMaterialStore();
  const { code } = props;
  const materialItem = getMaterialItemByCode(code);

  const {
    setOverComponentId,
    setOverComponentPlacement,
    insertFormItem,
    swapFormItem,
  } = useSchemaStore();
  const ref = useRef<HTMLDivElement>(null);
  const [{ isOver }, drop] = useDrop({
    accept: materialKeys,
    drop(item: ItemType, monitor) {
      if (!ref.current || item.id === props.id) return;

      if (monitor.didDrop()) {
        return;
      }

      if (item.dragType === "move") {
        console.log("move", item);
        swapFormItem(item.id, props.id);
        return;
      }

      insertFormItem(materialMap[item.code]);
    },
    hover(item: any, monitor) {
      if (!ref.current || item.id === props.id) return;

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
      // 只有在 不是自身元素时 才是 isOver
      const draggingItem = monitor.getItem() as ItemType | null;
      const isOverValid =
        !!monitor.isOver({ shallow: true }) && draggingItem?.id !== props.id;

      return {
        isOver: isOverValid,
        canDrop: !!monitor.canDrop(),
      };
    },
  });

  const [, drag] = useDrag({
    type: props.code,
    item: {
      dragType: "move",
      id: props.id,
      code: props.code,
    },
    collect(monitor) {
      return {
        dragging: monitor.isDragging(),
      };
    },
  });

  useMount(() => {
    materialItem.hidden || drop(ref);
    materialItem.hidden || drag(ref);
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
