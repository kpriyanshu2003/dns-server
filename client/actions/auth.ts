import api from ".";
import { SignupFormData } from "@/@types/auth";
import { loginValidator, signupValidator } from "@/lib/auth";

export const signup = async (formData: SignupFormData) => {
  try {
    signupValidator(formData);
    return await api.post("/auth/register", formData);
  } catch (e: any) {
    console.log(e);
    throw new Error(e.message);
  }
};

export const login = async (email: string, password: string) => {
  try {
    loginValidator(email, password);
    return await api.post("/auth/login", { email, password });
  } catch (e: any) {
    console.log(e);
    throw new Error(e.message);
  }
};
