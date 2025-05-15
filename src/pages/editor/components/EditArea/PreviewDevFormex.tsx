import { useMaterialMap } from "@/stores/useMaterialStore";
import { Form } from "antd";
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
  const { formItems } = schema;
  const selectedIndex = formItems.findIndex(
    (item) => item.id === selectedComponentId
  );

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
      className=" overflow-x-hidden overflow-y-auto edit-area relative w-full h-full bg-white md:bg-gradient-to-b md:from-indigo-200 md:via-cyan-50 md:to-white "
    >
      <div className={classNames("p-4")} ref={formexDomRef}>
        <Form colon={false} layout="vertical">
          {formItems.map((it) => {
            const { code, props, id } = it;
            const martialItem = materialMap[code];
            if (!martialItem) return;
            const { dev: T } = martialItem;
            return (
              <T
                key={id}
                id={id}
                code={code}
                {...martialItem.defaultProps}
                {...props}
              />
            );
          })}
        </Form>
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
          key={selectedIndex}
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
