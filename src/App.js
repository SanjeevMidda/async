import { useMemo, useState, useEffect } from "react";
import "./index.css";

const USERS = [
  { id: 1, name: "Alice Johnson", role: "Admin" },

  { id: 2, name: "Bob Smith", role: "User" },

  { id: 3, name: "Charlie Brown", role: "User" },

  { id: 4, name: "Diana Prince", role: "Manager" },
];

function App() {
  const [userInput, setUserInput] = useState("");
  const [role, setRole] = useState("all");
  const [users, setUsers] = useState(USERS);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // part 1: create fake API function
  const fetchUsers = () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const usersExist = false;

        if (usersExist) {
          resolve(USERS);
        } else {
          reject(new Error(`${Math.random()} error`));
        }
      }, 2000);
    });
  };

  fetchUsers()
    .then((res) => console.log("Success:", res))
    .catch((err) => console.error("Failure:", err));

  // part 3 - button triggered fetch
  const loadUsers = () => {
    setLoading(true);
    setError("");
  };

  // part 3
  // const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  // async function fetchUsers(shouldSucceed = USERS, wait = 2000) {
  //   await delay(wait);

  //   if (shouldSucceed) return shouldSucceed;
  //   throw new Error(`${Math.random()} error!`);
  // }

  // useEffect(() => {
  //   const loadUsers = async () => {
  //     try {
  //       const res = await fetchUsers();
  //       console.log(res);
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   };
  //   loadUsers();
  // }, []);

  const handleInputChange = (e) => setUserInput(e.target.value);

  const handleDropdownChange = (e) => {
    setRole(e.target.value);
  };

  const filteredUsers = useMemo(() => {
    const normalizedInput = userInput.trim().toLowerCase();

    return USERS.filter(
      (user) =>
        user.name.toLowerCase().includes(normalizedInput) &&
        (role === "all" || user.role.toLowerCase() === role)
    );
  }, [userInput, role]);

  const filteredByRole = ({ user, role }) => {
    return USERS.filter((user) => user.role.toLowerCase() === role);
  };

  return (
    <div className="App">
      <div id="title">
        <div className="circle"></div>
        <h1>Zable Admin</h1>
      </div>

      <div className="mainWrapper">
        <div className="filterContainer">
          <input
            type="text"
            value={userInput}
            onChange={handleInputChange}
            placeholder="Enter name"
          />
          <label htmlFor="roleSelect">
            <select value={role} onChange={handleDropdownChange}>
              <option value="all">All</option>
              <option value="admin">Admin</option>
              <option value="user">User</option>
              <option value="manager">Manager</option>
            </select>
          </label>
        </div>

        <div className="mainUserDataContainer">
          <div className="headings">
            <h2>NAME</h2>
            <h2>ROLE</h2>
          </div>

          <div className="userData">
            {filteredUsers.length === 0 ? (
              <p>No users found</p>
            ) : (
              filteredUsers.map((user) => (
                <div className="userinfoContainer" key={user.id}>
                  <p>{user.name}</p>
                  <p>{user.role}</p>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      <button onClick={loadUsers}>load users</button>
    </div>
  );
}

export default App;

// user ? <div className="userinfoContainer" key={user.id}>
// <p>{user.name}</p>
// <p>{user.role}</p>
// </div> : <p>No users found</p>
