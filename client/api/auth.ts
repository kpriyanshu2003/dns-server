import api from ".";
import { loginValidator, signupValidator } from "@/lib/auth";
import { SignupFormData } from "@/@types/auth";

export const signup = async (formData: SignupFormData) => {
  signupValidator(formData);
  return await api.post("/auth/register", formData);
};

export const login = async (email: string, password: string) => {
  loginValidator(email, password);
  return await api.post("/auth/login", { email, password });
};
