// SortableListPage.tsx (React DnD 实现)
import { useState, useRef } from "react";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { motion, AnimatePresence } from "framer-motion";

const ItemType = "CARD";

const initialItems = [
  { id: "1", text: "卡片一" },
  { id: "2", text: "卡片二" },
  { id: "3", text: "卡片三" },
];

function DraggableCard({ id, text, index, moveCard }: any) {
  const ref = useRef<HTMLDivElement>(null);

  const [, drop] = useDrop({
    accept: ItemType,
    hover(item: any, monitor) {
      if (!ref.current) return;
      const dragIndex = item.index;
      const hoverIndex = index;
      if (dragIndex === hoverIndex) return;

      // const hoverBoundingRect = ref.current.getBoundingClientRect();
      // const hoverMiddleY =
      //   (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      // const clientOffset = monitor.getClientOffset();
      // const hoverClientY = clientOffset!.y - hoverBoundingRect.top;

      // if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) return;
      // if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) return;

      const hoverBoundingRect = ref.current.getBoundingClientRect();
      const hoverThreshold =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 3;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = clientOffset!.y - hoverBoundingRect.top;

      // ✅ 提早触发交换逻辑（1/3 而不是 1/2）
      if (dragIndex < hoverIndex && hoverClientY < hoverThreshold) return;
      if (
        dragIndex > hoverIndex &&
        hoverClientY >
          hoverBoundingRect.bottom - hoverBoundingRect.top - hoverThreshold
      )
        return;

      moveCard(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: ItemType,
    item: { id, index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  drag(drop(ref));

  return (
    <motion.div
      ref={ref}
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: isDragging ? 0.5 : 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="p-4 mb-2 bg-white rounded shadow cursor-move hover:shadow-lg"
    >
      {text}
    </motion.div>
  );
}

export default function SortableListPage() {
  const [items, setItems] = useState(initialItems);

  const moveCard = (from: number, to: number) => {
    const updated = [...items];
    const [moved] = updated.splice(from, 1);
    updated.splice(to, 0, moved);
    setItems(updated);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="max-w-md mx-auto p-8">
        <h1 className="text-xl font-bold mb-4">拖拽排序卡片列表 (React DnD)</h1>
        <AnimatePresence>
          {items.map((item, index) => (
            <DraggableCard
              key={item.id}
              id={item.id}
              index={index}
              text={item.text}
              moveCard={moveCard}
            />
          ))}
        </AnimatePresence>
      </div>
    </DndProvider>
  );
}
