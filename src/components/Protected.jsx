import { Navigate } from "react-router-dom";

export function Protected({ children }) {
  const login = localStorage.getItem("login");
  if (!login) {
    return <Navigate to={"/login"} />;
  } else {
    return children;
  }
}
