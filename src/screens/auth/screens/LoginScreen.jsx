import { useState } from "react";
import "./styles/auth.css";
import { Link, useNavigate } from "react-router-dom";
import SuccessModal from "../../../components/SuccessModal.jsx";
import { loginApi } from "../../../api/AuthApi.js";

const Login = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [successOpen, setSuccessOpen] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Signup Data:", form);
    if (!form?.email || !form?.password) {
      alert("Fields must be filled.");
      return;
    }
    let result = await loginApi(form)
    if (result?.Success) {
      document.cookie = "token=" + result.data.token;
      localStorage.setItem("login", form.email);
      setSuccessOpen(true);
    } else {
      alert(result.Message);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>🔐 Login</h2>

        <form onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Enter Email"
            value={form.email}
            onChange={handleChange}
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Enter Password"
            value={form.password}
            onChange={handleChange}
            required
          />

          <button type="submit">Login</button>
        </form>

        <p>
          Don’t have an account? <Link to="/signup">Signup</Link>
        </p>
      </div>
      <SuccessModal
        isOpen={successOpen}
        onClose={() => {
          setSuccessOpen(false);
          navigate("/");
          window.location.reload();
        }}
        title={"Login Success 🎉"}
        message="We have verified your account !"
      />
    </div>
  );
};

export { Login };
