import React, { useEffect, useState } from "react";
import { Link, useNavigate, NavLink } from "react-router-dom";
import "../styles/navBar.css";

const NavBar = () => {
  const [login, setLogin] = useState(localStorage.getItem("login"));
  const navigate = useNavigate();

  useEffect(() => {
    const handleLoginChange = () => {
      setLogin(localStorage.getItem("login"));
    };

    window.addEventListener("loginChange", handleLoginChange);

    return () => {
      window.removeEventListener("loginChange", handleLoginChange);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("login");
    window.dispatchEvent(new Event("loginChange"));
    navigate("/login");
  };

  return (
    <nav className="nav">
      <h2 className="logo">Work Place</h2>

      {login && (
        <div className="nav-right">
          <ul className="nav-links">
            <li>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive ? "link active" : "link"
                }
              >
                Home
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/task-board"
                className={({ isActive }) =>
                  isActive ? "link active" : "link"
                }
              >
                Task Board
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/about"
                className={({ isActive }) =>
                  isActive ? "link active" : "link"
                }
              >
                About
              </NavLink>
            </li>
          </ul>

          <NavLink to="/add-task" className="add-btn">
            + Add Task
          </NavLink>

          <button className="logout-btn" onClick={handleLogout}>
            Logout
          </button>
        </div>
      )}
    </nav>
  );
};

export { NavBar };
