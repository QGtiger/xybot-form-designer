import useMaterialDrop from "@/pages/editor/hooks/useMaterialDrop";
import { useMaterialMap } from "@/stores/useMaterialStore";
import { useMount } from "ahooks";
import { Form, Typography } from "antd";
import classNames from "classnames";
import { MouseEventHandler, useRef, useState } from "react";
import HoverMask from "./HoverMask";

export default function PreviewDevFormex({ schema }: { schema: FormexSchema }) {
  const materialMap = useMaterialMap();
  const { title, subtitle, background, formItems } = schema;

  const formexDomRef = useRef<HTMLDivElement>(null);

  const [hoverComponentId, setHoverComponetId] = useState("");

  const { drop, isOver } = useMaterialDrop({
    id: "preview-formex",
    accept: Object.keys(materialMap),
  });

  useMount(() => {
    drop(formexDomRef);
  });

  const handleMouseOver: MouseEventHandler = (e) => {
    const path = e.nativeEvent.composedPath();

    for (const element of path) {
      const ele = element as HTMLElement;

      const componentId = ele.dataset?.componentId;
      if (componentId) {
        setHoverComponetId(componentId);
        return;
      }
    }
    setHoverComponetId("");
  };

  return (
    <div
      onMouseOver={handleMouseOver}
      className=" edit-area relative w-full h-full bg-white md:bg-gradient-to-b md:from-indigo-200 md:via-cyan-50 md:to-white "
    >
      <div
        className="h-[180px]"
        style={{
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundImage: `url(${background})`,
        }}
      ></div>

      <div className="mt-4 p-4">
        <div
          className=" line-clamp-1 text-center text-xl font-semibold cursor-pointer"
          data-component-id="title"
        >
          {title}
        </div>
        <div className="mt-2">
          <div data-component-id="subtitle" className=" cursor-pointer">
            <Typography.Text type="secondary">{subtitle}</Typography.Text>
          </div>
        </div>
        <div
          className={classNames("mt-4", {
            "ring-1 rounded-sm": isOver,
          })}
          ref={formexDomRef}
        >
          <Form colon={false} layout="vertical">
            {formItems.map((it) => {
              const { code, props, id } = it;
              const martialItem = materialMap[code];
              if (!martialItem) return;
              const { dev: T } = martialItem;
              return (
                <Form.Item key={id} name={id}>
                  <T id={id} {...martialItem.defaultProps} {...props} />
                </Form.Item>
              );
            })}
          </Form>
        </div>
      </div>
      {hoverComponentId && (
        <HoverMask
          componentId={hoverComponentId}
          containerClassName="edit-area"
          portalClassName="hover-mask"
        />
      )}
      <div className="hover-mask"></div>
    </div>
  );
}
