import { useState } from "react";
import UserPage from "../users-page";
import "./style.css";

const AdminPage = ({ addUser }) => {
  const [isShownPopUp, setIsShowPopUp] = useState(false);
  const [userName, setUserName] = useState("");
  return (
    <>
      <div className="adminPageContainer">
        <div className="adminPageHead">
          <button onClick={() => setIsShowPopUp(true)}>Create user</button>
        </div>
        <div className={isShownPopUp ? "popUpForm" : "popUpFormHide"}>
          <form
            autoComplete="off"
            className="adminPageForm"
            onSubmit={(e) => {
              if (userName.trim()) {
                e.preventDefault();
                setIsShowPopUp(false);
                addUser(userName);
                setUserName("");
              } else {
                e.preventDefault();
              }
            }}
          >
            <div className="adminPageInputField">
              <label htmlFor="input">User name</label>
              <input
                type="text"
                id="input"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
              />
            </div>
            <div className="adminPageButton">
              <button>Create</button>
            </div>
          </form>
        </div>
      </div>
      <UserPage />
    </>
  );
};

export default AdminPage;
