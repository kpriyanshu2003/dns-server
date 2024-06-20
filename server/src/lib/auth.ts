export const createUserValidator = ({
  username,
  email,
  password,
}: {
  username: string;
  email: string;
  password: string;
}) => {
  if (!username) throw new Error("Username is required");
  if (!email) throw new Error("Email is required");
  if (!password) throw new Error("Password is required");
  if (password.length < 6)
    throw new Error("Password must be at least 6 characters long");
};
