import React, { useState } from "react";

const InputField = ({ addTask }) => {
  const [taskText, setTaskText] = useState("");

  const handleAddTask = () => {
    if (taskText.trim() !== "") {
      addTask(taskText);
      setTaskText("");
    }
  };

  return (
    <div className="flex mb-6 justify-center">
      <input
        type="text"
        className="border p-2 rounded w-1/3 shadow-md"
        placeholder="Enter a task"
        value={taskText}
        onChange={(e) => setTaskText(e.target.value)}
      />
      <button
        onClick={handleAddTask}
        className="bg-blue-500 text-white px-4 py-2 ml-2 rounded shadow-md hover:bg-blue-600"
      >
        Add
      </button>
    </div>
  );
};

export default InputField;
