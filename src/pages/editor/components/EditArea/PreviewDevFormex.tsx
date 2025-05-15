import { useMaterialMap } from "@/stores/useMaterialStore";
import { Button, Form, Typography } from "antd";
import classNames from "classnames";
import { MouseEventHandler, useRef, useState } from "react";
import HoverMask from "./HoverMask";
import { useSchemaStore } from "@/stores/useSchemaStore";
import { motion } from "framer-motion";

export default function PreviewDevFormex() {
  const {
    overComponentId,
    overPlacement,
    selectedComponentId,
    setSelectedComponentId,
    getMaterialItemByComponentId,
  } = useSchemaStore();
  const { schema } = useSchemaStore();
  const materialMap = useMaterialMap();
  const { title, subtitle, background, formItems } = schema;

  const formexDomRef = useRef<HTMLDivElement>(null);

  const [hoverComponentId, setHoverComponetId] = useState("");

  const handleMouseOver: MouseEventHandler = (e) => {
    // 通过 e.nativeEvent.composedPath() 获取到鼠标悬停的元素 冒泡的元素列表
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

  const handleClick: MouseEventHandler = (e) => {
    const path = e.nativeEvent.composedPath();

    for (const element of path) {
      const ele = element as HTMLElement;

      const componentId = ele.dataset?.componentId;
      if (componentId) {
        setSelectedComponentId(componentId);
        return;
      }
    }
    setSelectedComponentId("");
  };

  return (
    <div
      onMouseOver={handleMouseOver}
      onClick={handleClick}
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
                  <T
                    id={id}
                    code={code}
                    {...martialItem.defaultProps}
                    {...props}
                  />
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

      {/* 显示选择 mask */}
      {selectedComponentId && (
        <HoverMask
          componentId={selectedComponentId}
          containerClassName="edit-area"
          portalClassName="selected-mask"
          renderMask={(props) => {
            const { icon, name } = getMaterialItemByComponentId(
              selectedComponentId,
              materialMap
            )!;
            return (
              <div
                style={{
                  position: "absolute",
                  left: props.left - 2,
                  top: props.top - 2,
                  border: "2px solid blue",
                  pointerEvents: "none",
                  width: props.width + 4,
                  height: props.height + 4,
                  zIndex: 12,
                  borderRadius: 2,
                  boxSizing: "border-box",
                }}
              >
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <div className="absolute px-2 h-[25px] bg-blue-600 text-white font-sans text-xs top-[-30px] rounded-sm overflow-hidden flex items-center justify-center">
                    <div className="flex gap-1">
                      <div className="">{icon}</div>
                      <div>{name}</div>
                    </div>
                  </div>
                </motion.div>
              </div>
            );
          }}
        />
      )}
      <div className="selected-mask"></div>
    </div>
  );
}
