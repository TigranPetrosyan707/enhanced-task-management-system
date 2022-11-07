import { useNavigate } from "react-router-dom";
import "./style.css";

const BoardPage = ({ userBoards }) => {
  const navigate = useNavigate();
  return (
    <div className="boardsContainer">
      {userBoards.map((board) => {
        return (
          <div
            key={board.boardID}
            className="singleBoard"
            onClick={() => navigate(`/task/${board.boardID}`)}
          >
            {board.boardName}
          </div>
        );
      })}
    </div>
  );
};

export default BoardPage;
