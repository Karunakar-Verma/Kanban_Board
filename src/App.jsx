import { useState } from "react";
import InputField from "./components/inputField";
import Columns from "./components/columns";
import { DndContext } from "@dnd-kit/core";

function App() {
  const [columns, setColumns] = useState({
    todo: [],
    inProgress: [],
    completed: [],
  });

  const addTask = (task) => {
    setColumns({
      ...columns,
      todo: [...columns.todo, { id: Date.now(), text: task }],
    });
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (!over) return;

    const sourceColumn = Object.keys(columns).find((key) =>
      columns[key].some((task) => task.id === active.id)
    );
    const destinationColumn = over.id;

    if (sourceColumn === destinationColumn) return;

    const taskToMove = columns[sourceColumn].find((task) => task.id === active.id);
    setColumns({
      ...columns,
      [sourceColumn]: columns[sourceColumn].filter((task) => task.id !== active.id),
      [destinationColumn]: [...columns[destinationColumn], taskToMove],
    });
  };

  return (
    <div className="flex flex-col bg-gray-100 min-h-screen p-6">
      <h1 className="text-center text-3xl font-bold mb-4 text-blue-600">
        Task Management Board
      </h1>
      <InputField addTask={addTask} />
      <DndContext onDragEnd={handleDragEnd}>
        <div className="flex flex-row justify-center gap-x-6">
          <Columns id="todo" title="To-Do" tasks={columns.todo} />
          <Columns id="inProgress" title="In-Progress" tasks={columns.inProgress} />
          <Columns id="completed" title="Completed" tasks={columns.completed} />
        </div>
      </DndContext>
    </div>
  );
}

export default App;
