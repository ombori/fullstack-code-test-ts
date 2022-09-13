import React, { useState } from "react";
import "./App.css";
function AddNewTask({ addTask }) {
    const [value, setValue] = useState("");
    const handleSubmit = e => {
      e.preventDefault();
      if (!value) return;
      addTask(value);
      setValue("");
    };
    return (
      <form onSubmit={handleSubmit} className="task-form">
        <div>
        <textarea
          type="text"
          className="input"
          placeholder="Add new task"
          value={value}
          onChange={e => setValue(e.target.value)}
        //   cols={10}
          rows={3}
        ></textarea>
        </div>
        <div>
        <button className="submit-btn" type="submit">Add Task</button>
        </div>
      </form>
    );
  }
export default AddNewTask;
