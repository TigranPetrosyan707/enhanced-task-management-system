import { createContext, useReducer } from "react";
import { Routes, Route } from "react-router-dom";
import AdminPage from "./components/admin-page";
import { v4 as uuid } from "uuid";
import angel from "./assets/angel.png";
import devil from "./assets/devil.png";
import UserPage from "./components/user-page";
import TasksPage from "./components/tasks-page";

const randomIcon = [angel, devil];

const reducer = (state, action) => {
  switch (action.type) {
    case "add_user":
      const { ...user } = action.payload;
      return [...state, user];
    case "add_board":
      return state.map((user) => {
        if (user.id == action.payload.userID) {
          user.userBoard.push({
            boardID: action.payload.boardID,
            boardName: action.payload.boardName,
            tasks: action.payload.tasks,
          });
          return user;
        }
        return user;
      });
    case "add_block":
      return state.map((user) => {
        return {
          ...user,
          userBoard: user.userBoard.map((board) => {
            if (board.boardID == action.payload.userBoard.boardID) {
              return {
                ...board,
                tasks: {
                  ...board.tasks,
                  [action.payload.blockName]: [],
                },
              };
            }
            return board;
          }),
        };
      });
    case "remove_block":
      return state.map((user) => {
        return {
          ...user,
          userBoard: user.userBoard.map((board) => {
            if (board.boardID == action.payload.boardID) {
              const filteredTasks = Object.keys(board.tasks)
                .filter((task) => task != action.payload.blockName)
                .reduce((acc, item) => {
                  acc[item] = [];
                  return acc;
                }, {});
              return {
                ...board,
                tasks: {
                  ...filteredTasks,
                },
              };
            }
            return board;
          }),
        };
      });
    case "addNewTask":
      return state.map((user) => {
        return {
          ...user,
          userBoard: user.userBoard.map((board) => {
            if (board.boardID == action.payload.boardID) {
              return {
                ...board,
                tasks: {
                  ...board.tasks,
                  [action.payload.taskName]: [
                    ...board.tasks[action.payload.taskName],
                    {
                      taskID: uuid(),
                      taskName: action.payload.newTaskName,
                    },
                  ],
                },
              };
            }
            return board;
          }),
        };
      });
    case "removeTask":
      return state.map((user) => {
        return {
          ...user,
          userBoard: user.userBoard.map((board) => {
            if (board.boardID == action.payload.boardID) {
              return {
                ...board,
                tasks: {
                  ...board.tasks,
                  [action.payload.taskName]: board.tasks[
                    action.payload.taskName
                  ].filter((task) => task.taskID != action.payload.taskID),
                },
              };
            }
            return board;
          }),
        };
      });
    default:
      return state;
  }
};

export const UsersDataContext = createContext();

function App() {
  const [usersData, dispatch] = useReducer(reducer, []);

  const addUser = (userName) => {
    dispatch({
      type: "add_user",
      payload: {
        id: uuid(),
        userName,
        userBoard: [],
        img: randomIcon[Math.round(Math.random())],
      },
    });
  };

  const addBoard = (userID, boardName) => {
    dispatch({
      type: "add_board",
      payload: {
        userID,
        boardName,
        boardID: uuid(),
        tasks: { todo: [], doing: [], done: [] },
      },
    });
  };

  const addBlock = (userBoard, blockName) => {
    dispatch({
      type: "add_block",
      payload: { userBoard: userBoard[0], blockName },
    });
  };

  const removeBlock = (boardID, blockName) => {
    dispatch({ type: "remove_block", payload: { boardID, blockName } });
  };

  const addNewTask = (boardID, newTaskName, taskName) => {
    dispatch({
      type: "addNewTask",
      payload: { boardID, newTaskName, taskName },
    });
  };

  const removeTask = (boardID, taskID, taskName) => {
    dispatch({ type: "removeTask", payload: { boardID, taskID, taskName } });
  };

  return (
    <div>
      <Routes>
        <Route
          path="/"
          element={
            <UsersDataContext.Provider value={usersData}>
              <AdminPage addUser={addUser} />
            </UsersDataContext.Provider>
          }
        />
        <Route
          path="user/:userID"
          element={<UserPage usersData={usersData} addBoard={addBoard} />}
        />
        <Route
          path="task/:boardID"
          element={
            <TasksPage
              usersData={usersData}
              addBlock={addBlock}
              removeBlock={removeBlock}
              addNewTask={addNewTask}
              removeTask={removeTask}
            />
          }
        />
      </Routes>
    </div>
  );
}

export default App;
