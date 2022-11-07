import { useState } from "react";
import "./style.css";

const TaskPage = ({
  taskName,
  task,
  boardID,
  removeBlock,
  addNewTask,
  removeTask,
}) => {
  const [activePortal, setActivePortal] = useState(false);
  const [newTaskName, setNewTaskName] = useState("");
  return (
    <div className="singleTask">
      <div className="singleTaskHead">{taskName}</div>
      <div className="newTaskSection">
        {task.map((newTask) => (
          <div key={newTask.taskID} className="singleNewTask">
            {newTask.taskName}
            <button
              className="singleTaskDelete"
              onClick={() => removeTask(boardID, newTask.taskID, taskName)}
            >
              delete
            </button>
          </div>
        ))}
      </div>

      <button
        onClick={() => removeBlock(boardID, taskName)}
        className="singleButton"
      >
        remove
      </button>
      <button className="singleButtonAdd" onClick={() => setActivePortal(true)}>
        add
      </button>
      <div className={activePortal ? "addTaskPortal" : "addTaskPortalHide"}>
        <form
          className="addPortalForm"
          autoComplete="off"
          onSubmit={(e) => {
            e.preventDefault();
            setActivePortal(false);
            addNewTask(boardID, newTaskName, taskName);
            setNewTaskName("");
          }}
        >
          <div className="addPortalInputField">
            <label htmlFor="input">Task name</label>
            <input
              type="text"
              id="input"
              value={newTaskName}
              onChange={(e) => setNewTaskName(e.target.value)}
            />
          </div>
          <div className="addPortalButton">
            <button>Create</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskPage;
