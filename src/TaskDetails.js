import React, {useState} from "react";
import "./App.css";
function TaskDetails({ task, index, completeTask, removeTask}) {
    return (
      <div
        className="task-list"
        style={{ textDecoration: task.isCompleted ? "line-through" : "" }}
      >
        <p className="task-p">{task.text}</p>
        <div className="btn-div">  
          <button className="s-btn" onClick={() => completeTask(index)}>{ task.isCompleted ? 'Completed' : "Complete"}</button>
          <button className="del-btn" onClick={() => removeTask(index)}>x</button>
        </div>
      </div>
    );
  }
  export default TaskDetails;