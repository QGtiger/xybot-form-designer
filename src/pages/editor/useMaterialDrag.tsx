import { useMount } from "ahooks";
import { useDrag } from "react-dnd";

export default function useMaterialDrag({
  type,
  it,
  ref,
}: {
  type: string;
  it: MaterialItem;
  ref: React.RefObject<HTMLDivElement | null>;
}) {
  const [, drag] = useDrag({
    type,
    item: { ...it },
  });

  useMount(() => {
    drag(ref);
  });
}
