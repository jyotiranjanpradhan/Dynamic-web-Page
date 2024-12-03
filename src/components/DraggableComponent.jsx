import React from "react";
import { useDrag } from "react-dnd";

const DraggableComponent = ({ id, type, left, top, children }) => {
  const [, drag] = useDrag({
    type: "component",
    item: { id, type, left, top },
  });

  return (
    <div
      ref={drag}
      style={{
        position: "absolute",
        left,
        top,
        cursor: "move",
      }}
    >
      {children}
    </div>
  );
};

export default DraggableComponent;
