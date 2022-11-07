import { useContext, memo } from "react";
import { UsersDataContext } from "../../App";
import { useNavigate } from "react-router-dom";

import "./style.css";

const UserPage = () => {
  const usersData = useContext(UsersDataContext);
  const navigate = useNavigate();
  return (
    <div className="usersPageContainer">
      {usersData.map((user) => {
        return (
          <div
            className="userPageUser"
            key={user.id}
            onClick={() => navigate(`user/${user.id}`)}
          >
            <div className="userPageName">{user.userName} </div>
            <div className="userPageIcon">
              <img src={user.img} alt="random" />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default memo(UserPage);
