import { Route, Routes } from "react-router-dom";
import "./App.css";
import { NavBar } from "./components/NavBar";
import { Protected } from "./components/Protected";
import { Public } from "./components/Public";
import "../src/theme/theme.css"; 
import { Login, Signup } from "./screens/auth";
import { HomePage } from "./screens/home";
import { AboutPage } from "./screens/about";
import { AddTask } from "./screens/add-task";
import { TaskBoard } from "./screens/taskBoard";

function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route
          path="/"
          element={
            <Protected>
              <HomePage />
            </Protected>
          }
        />
        <Route
          path="/signup"
          element={
            <Public>
              <Signup />
            </Public>
          }
        />
        <Route
          path="/login"
          element={
            <Public>
              <Login />
            </Public>
          }
        />
        <Route
          path="/about"
          element={
            <Protected>
              <AboutPage />
            </Protected>
          }
        />
        <Route
          path="/add-task"
          element={
            <Protected>
              <AddTask />
            </Protected>
          }
        />
        <Route
          path="/task-board"
          element={
            <Protected>
              <TaskBoard />
            </Protected>
          }
        />
      </Routes>
    </>
  );
}

export default App;
