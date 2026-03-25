import { apiRequest } from "./client";

// 🔐 Login
export const loginApi = (payload) =>
  apiRequest({
    endpoint: "/auth/login",
    method: "POST",
    body: payload,
  });

// 📝 Signup
export const signupApi = (payload) =>
  apiRequest({
    endpoint: "/auth/signup",
    method: "POST",
    body: payload,
  });