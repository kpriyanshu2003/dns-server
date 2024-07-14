import api from ".";
import { SignupFormData } from "@/@types/auth";
import { loginValidator, signupValidator } from "@/lib/auth";

export const signup = async (formData: SignupFormData) => {
  try {
    signupValidator(formData);
    const response = await fetch(api + "/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
    if (!response.ok) throw new Error("Failed to signup");

    return await response.json();
  } catch (e: any) {
    console.log(e);
    throw new Error(e.message);
  }
};

export const login = async (email: string, password: string) => {
  try {
    loginValidator(email, password);
    const response = await fetch(api + "/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    if (!response.ok) throw new Error("Failed to login");
    return await response.json();
  } catch (e: any) {
    console.log(e);
    throw new Error(e.message);
  }
};
