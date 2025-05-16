import { useMaterialMap } from "@/stores/useMaterialStore";
import classNames from "classnames";
import React, { MouseEventHandler, useEffect, useRef, useState } from "react";
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
    getFormexItemIndexByComponentId,
  } = useSchemaStore();
  const { schema } = useSchemaStore();
  const materialMap = useMaterialMap();
  const { formItems } = schema;
  const selectedIndex = getFormexItemIndexByComponentId(selectedComponentId);

  const formexDomRef = useRef<HTMLDivElement>(null);

  const [hoverComponentId, setHoverComponetId] = useState("");

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

  // useEffect(() => {
  //   const handleMouseOver = (e: MouseEvent) => {
  //     // 通过 e.nativeEvent.composedPath() 获取到鼠标悬停的元素 冒泡的元素列表
  //     const path = e.composedPath();

  //     for (const element of path) {
  //       const ele = element as HTMLElement;

  //       const componentId = ele.dataset?.componentId;
  //       if (componentId) {
  //         setHoverComponetId(componentId);
  //         return;
  //       }
  //     }
  //     setHoverComponetId("");
  //   };
  //   document.addEventListener("mouseover", handleMouseOver);
  //   return () => {
  //     document.removeEventListener("mouseover", handleMouseOver);
  //   };
  // }, []);

  function renderComponents(components?: FormexItem[]): React.ReactNode {
    if (!components) return null;
    return components.map((it) => {
      const { code, props, id } = it;
      const martialItem = materialMap[code];
      if (!martialItem) return;
      const { dev: T } = martialItem;

      return React.createElement(
        T,
        {
          key: id,
          id,
          code,
          ...martialItem.defaultProps,
          ...props,
        },
        renderComponents(it.children)
      );
    });
  }

  return (
    <div
      onClick={handleClick}
      onMouseOver={handleMouseOver}
      className="edit-area relative w-full min-h-full bg-white md:bg-gradient-to-b md:from-indigo-200 md:via-cyan-50 md:to-white  rounded-xl"
    >
      <div className={classNames("")} ref={formexDomRef}>
        {renderComponents(formItems)}
        {/* {formItems.map((it) => {
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
        })} */}
        {/* <Form
          colon={false}
          layout="vertical"
          onFinish={() => {
            console.log("submit");
          }}
        >
          
        </Form> */}
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
                  top:
                    props.top +
                    (overPlacement === "top" ? 0 : props.height + 2),
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
