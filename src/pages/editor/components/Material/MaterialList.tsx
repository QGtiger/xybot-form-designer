import { useMaterialList } from "@/stores/useMaterialStore";

export default function MaterialList() {
  const list = useMaterialList();
  return (
    <div className=" grid grid-cols-2 gap-3">
      {list.map((it) => {
        return (
          <div
            className="py-2 px-4 flex gap-2 border-gray-300 border rounded-md hover:bg-gray-100 hover:shadow-md cursor-pointer text-sm"
            key={it.code}
          >
            <div>{it.icon}</div>
            <div className=" line-clamp-1">{it.name}</div>
          </div>
        );
      })}
    </div>
  );
}
