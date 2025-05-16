import { useBoolean } from "ahooks";
import { Select } from "antd";
import { useEffect, useRef } from "react";

export default function MutliSelect(props: any) {
  const ref = useRef<HTMLDivElement>(null);
  const [open, openAction] = useBoolean(false);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      const ele = ref.current;
      if (!ele) return;
      if (!ele.contains(event.target as Node)) {
        openAction.setFalse();
      } else {
        openAction.setTrue();
      }
    }

    document.body.addEventListener("click", handleClickOutside);
    return () => {
      document.body.removeEventListener("click", handleClickOutside);
    };
  }, [openAction]);

  return (
    <div ref={ref}>
      <Select
        {...props}
        open={open}
        mode="multiple"
        style={{ width: "100%" }}
        getPopupContainer={() => ref.current as HTMLElement}
      />
    </div>
  );
}
