import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { List } from "antd";
import { useEffect, useState } from "react";

// 拖拽项组件
const DraggableItem = ({
  item,
  index,
  moveItem,
}: {
  item: string;
  index: number;
  moveItem: (fromIndex: number, toIndex: number) => void;
}) => {
  const [{ isDragging }, drag] = useDrag({
    type: "LIST_ITEM",
    item: { index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [, drop] = useDrop({
    accept: "LIST_ITEM",
    hover: (draggedItem: { index: number }) => {
      if (draggedItem.index !== index) {
        moveItem(draggedItem.index, index);
        draggedItem.index = index; // 更新拖拽项索引
      }
    },
  });

  return (
    <div
      ref={(node) => drag(drop(node))}
      style={{
        opacity: isDragging ? 0.5 : 1,
        cursor: "move",
        padding: "8px",
        border: "1px solid #ddd",
        margin: "4px 0",
        backgroundColor: "#fff",
      }}
    >
      {item}
    </div>
  );
};

// 列表容器
const SortableList = ({ items }: { items: string[] }) => {
  const [listItems, setListItems] = useState(items);

  const moveItem = (fromIndex: number, toIndex: number) => {
    const newItems = [...listItems];
    const [removed] = newItems.splice(fromIndex, 1);
    newItems.splice(toIndex, 0, removed);
    setListItems(newItems);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <List
        bordered
        dataSource={listItems}
        renderItem={(item, index) => (
          <DraggableItem item={item} index={index} moveItem={moveItem} />
        )}
      />
    </DndProvider>
  );
};

// 使用示例
export const SortableListDemo = () => {
  const initialItems = ["选项1", "选项2", "选项3", "选项4"];
  return <SortableList items={initialItems} />;
};
