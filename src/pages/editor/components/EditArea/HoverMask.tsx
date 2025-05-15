import { useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";

interface HoverMaskProps {
  componentId: string;
  containerClassName: string;
  portalClassName: string;

  renderMask?: (props: {
    left: number;
    top: number;
    width: number;
    height: number;
  }) => React.ReactNode;
}

export default function HoverMask({
  componentId,
  containerClassName,
  portalClassName,
  renderMask,
}: HoverMaskProps) {
  const [position, setPosition] = useState({
    left: 0,
    top: 0,
    width: 0,
    height: 0,
  });

  useEffect(() => {
    if (!componentId) return;

    const container = document.querySelector(`.${containerClassName}`);
    if (!container) return;

    const node = document.querySelector(`[data-component-id="${componentId}"]`);
    if (!node) return;

    const { top, left, width, height } = node.getBoundingClientRect();
    const { top: containerTop, left: containerLeft } =
      container.getBoundingClientRect();

    setPosition({
      top: top - containerTop + container.scrollTop,
      left: left - containerLeft,
      width,
      height,
    });
  }, [componentId]);

  const ele = useMemo(() => {
    return document.querySelector(`.${portalClassName}`)!;
  }, []);

  return createPortal(
    renderMask ? (
      renderMask(position)
    ) : (
      <div
        style={{
          position: "absolute",
          left: position.left - 2,
          top: position.top - 2,
          backgroundColor: "rgba(0, 0, 255, 0.1)",
          border: "1px dashed blue",
          pointerEvents: "none",
          width: position.width + 4,
          height: position.height + 4,
          zIndex: 12,
          borderRadius: 2,
          boxSizing: "border-box",
        }}
      />
    ),
    ele
  );
}
