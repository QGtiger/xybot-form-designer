import { useMaterialMap } from "@/stores/useMaterialStore";
import { Button, Form, Typography } from "antd";
import classNames from "classnames";
import { MouseEventHandler, useRef, useState } from "react";
import HoverMask from "./HoverMask";
import { useSchemaStore } from "@/stores/useSchemaStore";

export default function PreviewDevFormex() {
  const { overComponentId, overPlacement } = useSchemaStore();
  const { schema } = useSchemaStore();
  const materialMap = useMaterialMap();
  const { title, subtitle, background, formItems } = schema;

  const formexDomRef = useRef<HTMLDivElement>(null);

  const [hoverComponentId, setHoverComponetId] = useState("");

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
      className=" overflow-auto edit-area relative w-full h-full bg-white md:bg-gradient-to-b md:from-indigo-200 md:via-cyan-50 md:to-white "
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

        <div className={classNames("mt-4")} ref={formexDomRef}>
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
          <div data-component-id="submit" className="w-full cursor-pointer">
            <Button type="primary" htmlType="submit" data-component-id="submit">
              提交
            </Button>
          </div>
        </div>
      </div>
      {/* 显示 hoverMask */}
      {hoverComponentId && (
        <HoverMask
          componentId={hoverComponentId}
          containerClassName="edit-area"
          portalClassName="hover-mask"
        />
      )}
      <div className="hover-mask"></div>

      {/* 显示 over 示意线 */}
      {overComponentId && (
        <HoverMask
          componentId={overComponentId}
          containerClassName="edit-area"
          portalClassName="over-line"
          renderMask={(props) => {
            return (
              <div
                className=" absolute h-[2px] bg-blue-500"
                style={{
                  left: props.left,
                  top: props.top + (overPlacement === "top" ? 0 : props.height),
                  width: props.width,
                }}
              ></div>
            );
          }}
        />
      )}
      <div className="over-line"></div>
    </div>
  );
}
