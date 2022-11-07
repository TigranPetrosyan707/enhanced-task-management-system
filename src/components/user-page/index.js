import "./style.css";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import BoardPage from "../board-page";

const UserPage = ({ usersData, addBoard }) => {
  const navigate = useNavigate();
  const params = useParams();
  const user = usersData.filter((singleUser) => singleUser.id == params.userID);
  const [isShown, setIsShown] = useState(false);
  const [boardName, setBoardName] = useState("");
  return (
    <div className="userPageContainer">
      <div className="userPageHead">
        <span>User </span> {user[0].userName}
      </div>
      <div className="navigateButton">
        <button onClick={() => navigate("/")}>Go to home</button>
      </div>
      <div className="userPageButton">
        <button onClick={() => setIsShown(true)}>Create board</button>
      </div>
      <div
        className={isShown ? "singleUserPopUpForm" : "singleUserPopUpFormHide"}
      >
        <form
          autoComplete="off"
          className="singleUserAdminPageForm"
          onSubmit={(e) => {
            e.preventDefault();
            setIsShown(false);
            addBoard(params.userID, boardName);
            setBoardName("");
          }}
        >
          <div className="singleUserAdminPageInputField">
            <label htmlFor="input">Board name</label>
            <input
              type="text"
              id="input"
              value={boardName}
              onChange={(e) => setBoardName(e.target.value)}
            />
          </div>
          <div className="singleUserAdminPageButton">
            <button>Create</button>
          </div>
        </form>
      </div>
      <BoardPage userBoards={user[0].userBoard} />
    </div>
  );
};

export default UserPage;
