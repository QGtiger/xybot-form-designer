# feat1

- 动画 就用 motion https://motion.dev/docs/react-animate-presence

* 参考文献 https://github.com/QuarkGluonPlasma/react-course-code/blob/main/lowcode-editor/src/editor/components/Material/index.tsx

- 参考 Code https://lovable.dev/projects/b90bf2ec-3283-49f2-8fcc-f1e2b0f8ac1d
- UI https://component-flow-designer.lovable.app/

- react-dnd 的使用逻辑
  https://juejin.cn/book/7294082310658326565/section/7353923174821527606

- 拖拽排序示例代码

```tsx
import { useCallback, useEffect, useRef, useState } from "react";
import "./App2.css";
import { useDrag, useDrop } from "react-dnd";

interface CardItem {
  id: number;
  content: string;
}

interface CardProps {
  data: CardItem;
  index: number;
  swapIndex: Function;
}

interface DragData {
  id: number;
  index: number;
}

function Card(props: CardProps) {
  const { data, swapIndex, index } = props;

  const ref = useRef(null);

  const [{ dragging }, drag] = useDrag({
    type: "card",
    item: {
      id: data.id,
      index: index,
    },
    collect(monitor) {
      return {
        dragging: monitor.isDragging(),
      };
    },
  });
  const [, drop] = useDrop({
    accept: "card",
    hover(item: DragData) {
      swapIndex(index, item.index);
      item.index = index;
    },
    // drop(item: DragData) {
    //     swapIndex(index, item.index)
    // }
  });

  useEffect(() => {
    drag(ref);
    drop(ref);
  }, []);

  return (
    <div ref={ref} className={dragging ? "card dragging" : "card"}>
      {data.content}
    </div>
  );
}

function App() {
  const [cardList, setCardList] = useState<CardItem[]>([
    {
      id: 0,
      content: "000",
    },
    {
      id: 1,
      content: "111",
    },
    {
      id: 2,
      content: "222",
    },
    {
      id: 3,
      content: "333",
    },
    {
      id: 4,
      content: "444",
    },
  ]);

  const swapIndex = useCallback((index1: number, index2: number) => {
    const tmp = cardList[index1];
    cardList[index1] = cardList[index2];
    cardList[index2] = tmp;

    setCardList([...cardList]);
  }, []);

  return (
    <div className="card-list">
      {cardList.map((item: CardItem, index) => (
        <Card
          data={item}
          key={"card_" + item.id}
          index={index}
          swapIndex={swapIndex}
        />
      ))}
    </div>
  );
}

export default App;
```

- 判断 hover 是在上半部分还是下半部分
  你说得对，`react-dnd` 的 `useDrop` 默认的 `monitor.isOver()` 只能判断是否悬停在目标上。但我们可以借助 `monitor.getClientOffset()` 和目标元素的位置 `ref.getBoundingClientRect()` 来判断 **光标在目标元素的上半部分还是下半部分**，从而实现类似插入“上”或“下”的逻辑。

---

### ✅ 示例：判断拖拽悬停在上半部分或下半部分

```tsx
import { useRef, useState } from "react";
import { useDrop } from "react-dnd";

const DropTarget = ({ onDropAbove, onDropBelow, children }: any) => {
  const ref = useRef<HTMLDivElement>(null);
  const [hoverPosition, setHoverPosition] = useState<"top" | "bottom" | null>(
    null
  );

  const [{ isOver }, drop] = useDrop(() => ({
    accept: "list-item",
    hover(item, monitor) {
      if (!ref.current) return;

      const clientOffset = monitor.getClientOffset();
      const boundingRect = ref.current.getBoundingClientRect();
      const hoverMiddleY = (boundingRect.bottom - boundingRect.top) / 2;
      const mouseY = clientOffset!.y - boundingRect.top;

      if (mouseY < hoverMiddleY) {
        setHoverPosition("top");
      } else {
        setHoverPosition("bottom");
      }
    },
    drop(item, monitor) {
      if (hoverPosition === "top") {
        onDropAbove(item);
      } else if (hoverPosition === "bottom") {
        onDropBelow(item);
      }
      setHoverPosition(null);
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  }));

  drop(ref);

  return (
    <div
      ref={ref}
      className={`p-4 border ${
        isOver
          ? hoverPosition === "top"
            ? "border-t-4 border-blue-500"
            : "border-b-4 border-blue-500"
          : "border-gray-200"
      }`}
    >
      {children}
    </div>
  );
};
```

---

### ✅ 用法示例：

```tsx
<DropTarget
  onDropAbove={(item) => console.log("Drop above", item)}
  onDropBelow={(item) => console.log("Drop below", item)}
>
  <div>我是一个可以接受拖拽的目标</div>
</DropTarget>
```

---

这个方式可以很灵活地让你实现**根据鼠标位置决定是添加到上面还是下面**。需要我帮你把这个集成进你已有的低代码表单中吗？
