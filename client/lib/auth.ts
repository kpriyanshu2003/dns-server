import { SignupFormData } from "@/@types/auth";

export const signupValidator = (formData: SignupFormData) => {
  if (!formData.username) throw new Error("Username is required");
  if (!formData.email) throw new Error("Email is required");
  if (!formData.password) throw new Error("Password is required");
  if (!formData.confirmPassword)
    throw new Error("Confirm Password is required");
  if (formData.password !== formData.confirmPassword)
    throw new Error("Passwords do not match");
};

export const loginValidator = (email: string, password: string) => {
  if (!email) throw new Error("Email is required");
  if (!password) throw new Error("Password is required");
};
