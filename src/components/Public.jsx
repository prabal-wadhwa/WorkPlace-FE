import { Navigate } from "react-router-dom";

export function Public({ children }) {
  const login = localStorage.getItem("login");

  if (login) {
    return <Navigate to="/" />;
  }

  return children;
}
