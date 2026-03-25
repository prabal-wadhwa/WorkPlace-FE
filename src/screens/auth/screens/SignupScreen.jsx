import  { useState } from "react";
import "./styles/auth.css";
import { Link, useNavigate } from "react-router-dom";
import { signupApi } from "../../../api/AuthApi";

const Signup = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Signup Data:", form);
    if (!form?.email || !form?.name || !form?.password) {
      alert("Fields must be filled.");
      return;
    }
    let result = await signupApi(form)
    if (result?.Success) {
      document.cookie = "token=" + result.data.token;
      localStorage.setItem("login", form.email);
      navigate("/");
      window.location.reload();
      alert("SignUp Success");
    } else {
      alert("SignUp Failed");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>📝 Signup</h2>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Enter Name"
            value={form.name}
            onChange={handleChange}
            required
          />

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

          <button type="submit">Signup</button>
        </form>

        <p>
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
};

export { Signup };
