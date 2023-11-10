import { useState, useContext } from "react";
import GithubContext from "../../context/github/GithubContext";
import AlertContext from "../../context/alert/AlertContext";
import { searchUsers } from "../../context/github/GithubActions";

function UserSearch() {
  const [text, setText] = useState("");

  const { users, dispatch } = useContext(GithubContext);
  const { setAlert } = useContext(AlertContext);

  const handleChange = (e) => setText(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (text === "") {
      setAlert("Please enter something", "error");
    } else {
      try {
        dispatch({ type: "SET_LOADING" });
        const users = await searchUsers(text);
        dispatch({ type: "GET_USERS", payload: users });
        setText("");
      } catch (error) {
        // handle error here, e.g., set an error message
        console.error(error);
      }
    }
  };

  return (
    <div className=" grid grid-cols-1 xl:grid-cols-2 lg:grid-cols-2 md:grid-cols-2 mb-8 gap-8">
      <div>
        <form onSubmit={handleSubmit} className=" form-control">
          <div className="relative">
            <input
              className="w-full pr-40 bg-gray-200 input input-lg text-black"
              type="text"
              placeholder="Search"
              value={text}
              onChange={handleChange}
            />
            <button
              type="submit"
              className="absolute top-0 right-0 rounded-l-none w-36 btn btn-lg"
            >
              GO
            </button>
          </div>
        </form>
      </div>

      {users.length > 0 && (
        <div>
          <button
            onClick={() => dispatch({ type: "CLEAR_USERS" })}
            className="btn btn-ghost btn-lg"
          >
            clear
          </button>
        </div>
      )}
    </div>
  );
}

export default UserSearch;
