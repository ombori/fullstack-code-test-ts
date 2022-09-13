import React, {useState} from "react";
import "./App.css";
import TaskDetails from './TaskDetails';
import AddNewTask from './AddNewTask';

function App() {
  const [tasks, setTasks] = useState([
    {
      text: "1. Frontend developer interview.",
      isCompleted: false
    },
    {
      text: "2. Technical Interview.",
      isCompleted: false
    },
    {
      text: "3. Final interview & assignment.",
      isCompleted: false
    }
  ]);

  const addTask = text => {
    const newTasks = [...tasks, { text }];
    setTasks(newTasks);
  };
  const completeTask = index => {
    const newTasks = [...tasks];
    newTasks[index].isCompleted = newTasks[index].isCompleted ? false: true;
    setTasks(newTasks);
  };
  const removeTask = index => {
    const newTasks = [...tasks];
    newTasks.splice(index, 1);
    setTasks(newTasks);
  };
  return (
    <div className="app tasks-container col-lg-8 offset-lg-2 col-lg-offset-2 col-md-8 offset-md-2 col-sm-8 offset-sm-2 col-xs-12">
    <div className="header">Todo Tasks App</div>
    <div className="task">
        {tasks.map((task, index) => (
          <TaskDetails
            key={index}
            index={index}
            task={task}
            completeTask={completeTask}
            removeTask={removeTask}
          />
        ))}
        <AddNewTask addTask={addTask} />
      </div>
    </div>

  );
}

export default App;
