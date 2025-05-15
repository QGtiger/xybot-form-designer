import { useMount } from "ahooks";
import { useRef } from "react";
import { useDrag } from "react-dnd";

export default function MaterialItem({ it }: { it: MaterialItem }) {
  const { code } = it;
  const ref = useRef<HTMLDivElement>(null);

  const [, drag] = useDrag({
    type: code,
    item: { ...it },
  });

  useMount(() => {
    drag(ref);
  });

  return (
    <div
      ref={ref}
      className="py-2 px-4 flex gap-2 border-gray-300 border rounded-md hover:bg-gray-100 hover:shadow-md cursor-pointer text-sm"
      key={it.code}
    >
      <div>{it.icon}</div>
      <div className=" line-clamp-1">{it.name}</div>
    </div>
  );
}
