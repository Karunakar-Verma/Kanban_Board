import React from "react";
import { useDraggable, useDroppable } from "@dnd-kit/core";

const Columns = ({ title, tasks, id }) => {
  const { setNodeRef: setDroppableRef } = useDroppable({ id });

  return (
    <div
      ref={setDroppableRef}
      className="h-[80vh] w-[50vh] border border-[1px] flex flex-col justify-start items-center"
    >
      <h1 className="text-lg font-bold bg-gray-100 w-full text-center py-2 border-b">
        {title}
      </h1>
      <div className="flex flex-col flex-1 w-full p-2 overflow-y-auto">
        {tasks.length === 0 ? (
          <p className="text-gray-500 text-center mt-4">No task added yet!</p>
        ) : (
          tasks.map((task) => <DraggableTask key={task.id} task={task} />)
        )}
      </div>
    </div>
  );
};

const DraggableTask = ({ task }) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: task.id,
  });

  const style = {
    transform: transform
      ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
      : undefined,
    position: transform ? "absolute" : "relative",
    border: "1px solid black",
    margin: "10px",
    padding: "10px",
    backgroundColor: "#f9f9f9",
    zIndex: transform ? 10 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className="border border-[2px] m-2 rounded-md shadow-md bg-white"
    >
      {task.text}
    </div>
  );
};

export default Columns;
