import { useMemo, useState } from "react";
import "./index.css";

const USERS = [
  { id: 1, name: "Alice Johnson", role: "Admin" },

  { id: 2, name: "Bob Smith", role: "User" },

  { id: 3, name: "Charlie Brown", role: "User" },

  { id: 4, name: "Diana Prince", role: "Manager" },

  { id: 5, name: "Jack Cork", role: "User" },
];

function App() {
  const [userInput, setUserInput] = useState("");
  const [role, setRole] = useState("all");

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
    </div>
  );
}

export default App;

// user ? <div className="userinfoContainer" key={user.id}>
// <p>{user.name}</p>
// <p>{user.role}</p>
// </div> : <p>No users found</p>
