import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import TaskPage from "../task-page";
import "./style.css";

const TasksPage = ({
  usersData,
  addBlock,
  removeBlock,
  addNewTask,
  removeTask,
}) => {
  const [isShowField, setIsShowField] = useState(false);
  const [blockName, setBlockName] = useState("");
  const navigate = useNavigate();
  const params = useParams();

  const currentUser = usersData
    .map((user) => user.userBoard)
    .flat()
    .filter((board) => board.boardID == params.boardID);
  const boardTasks = currentUser[0].tasks;

  return (
    <div className="tasksContainer">
      <div className="taskHead">
        <span>{currentUser[0].boardName}</span> task
        <div className="tasksButton">
          <button onClick={() => setIsShowField(true)}>Create block</button>
        </div>
      </div>
      <div className="boardTaskSection">
        {Object.keys(boardTasks).map((task) => (
          <TaskPage
            key={task}
            taskName={task}
            task={boardTasks[task]}
            boardID={params.boardID}
            removeBlock={removeBlock}
            addNewTask={addNewTask}
            removeTask={removeTask}
          />
        ))}
      </div>
      <div className={isShowField ? "boardPopUpForm" : "boardPopUpFormHide"}>
        <form
          className="boardForm"
          autoComplete="off"
          onSubmit={(e) => {
            e.preventDefault();
            setIsShowField(false);
            addBlock(currentUser, blockName);
            setBlockName("");
          }}
        >
          <div className="boardInputField">
            <label htmlFor="input">Block name</label>
            <input
              type="text"
              id="input"
              value={blockName}
              onChange={(e) => setBlockName(e.target.value)}
            />
          </div>
          <div className="boardFormButton">
            <button>Create</button>
          </div>
        </form>
      </div>
      <div className="taskNavigateButton">
        <button onClick={() => navigate(-1)}>Go to board</button>
      </div>
    </div>
  );
};

export default TasksPage;
