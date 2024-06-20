// import OTPModel from "../model/OTP";
import UserModel from "../model/User";
// import { generateOTP, sendOTP } from "../lib/otp";
import { generateToken } from "../lib/jwt";
import { Request, Response } from "express";
import { comparePassword, hashPassword } from "../lib/bcrypt";

export const createUser = async (req: Request, res: Response) => {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password)
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });

    const existingUser = await UserModel.findOne({ email });
    if (existingUser)
      return res
        .status(400)
        .json({ success: false, message: "User already exists" });

    const hashedPassword = hashPassword(password);
    const user = new UserModel({
      username,
      email,
      password: hashedPassword,
    });
    const token = generateToken({
      id: user._id,
      email: user.email,
      username: user.username,
    });
    await user.save();

    return res
      .status(201)
      .json({ success: true, message: "User Created", data: token });
  } catch (e: any) {
    console.log(e);
    return res.status(500).json({ success: false, message: e.message });
  }
};

export const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    if (!email)
      return res
        .status(400)
        .json({ success: false, message: "Email is required" });

    const user = await UserModel.findOne({ email });
    if (!user)
      return res
        .status(404)
        .json({ success: false, message: "User not found" });

    const isMatch = comparePassword(password, user.password);
    if (!isMatch)
      return res
        .status(400)
        .json({ success: false, message: "Incorrect password" });

    const token = generateToken({
      id: user._id,
      email: user.email,
      username: user.username,
    });
    return res.status(200).json({
      success: true,
      message: "User Authenticated",
      data: token,
    });
  } catch (e: any) {
    console.log(e);
    return res.status(500).json({ success: false, message: e.message });
  }
};

// export const forgotPassword = async (req: Request, res: Response) => {
//   try {
//     const { type } = req.query;
//     const { email, otp } = req.body;

//     if (!type)
//       return res
//         .status(400)
//         .json({ success: false, message: "Type is required" });

//     if (type !== "generate" && type !== "verify")
//       return res.status(400).json({ success: false, message: "Invalid type" });

//     if (type === "verify" && !otp)
//       return res
//         .status(400)
//         .json({ success: false, message: "OTP is required" });

//     if (!email)
//       return res
//         .status(400)
//         .json({ success: false, message: "Email is required" });

//     const user = await UserModel.findOne({ email });
//     if (!user)
//       return res
//         .status(404)
//         .json({ success: false, message: "User not found" });

//     if (type === "generate") {
//       const existingOTP = await OTPModel.findOne({ email });
//       if (!existingOTP) {
//         const otp = new OTPModel({ otp: generateOTP(4), email });
//         await sendOTP(otp.otp, email);
//         await otp.save();
//       } else await sendOTP(existingOTP.otp, email);

//       return res
//         .status(200)
//         .json({ success: true, message: "OTP sent to email" });
//     }

//     if (type === "verify") {
//       const otpp = await OTPModel.findOne({ email });
//       if (!otpp)
//         return res
//           .status(404)
//           .json({ success: false, message: "OTP not found" });
//       if (otpp.otp === otp) {
//         await OTPModel.deleteOne({ email });
//         await UserModel.updateOne({ email }, { password: hashPassword(otp) });
//         return res.status(200).json({ success: true, message: "OTP verified" });
//       }
//       return res.status(400).json({ success: false, message: "Invalid OTP" });
//     }
//     throw new Error("Invalid type");
//   } catch (e: any) {
//     console.log(e);
//     res.status(500).json({ success: false, message: e.message });
//   }
// };

// export const changePassword = async (req: Request, res: Response) => {
//   try {
//     const { email, password, newPassword } = req.body;
//     if (!email || !newPassword || !password)
//       return res
//         .status(400)
//         .json({ success: false, message: "All fields are required" });

//     if (password === newPassword)
//       return res.status(400).json({
//         success: false,
//         message: "New password cannot be the same as old password",
//       });

//     const user = await UserModel.findOne({ email });
//     if (!user)
//       return res
//         .status(404)
//         .json({ success: false, message: "User not found" });

//     const isMatch = comparePassword(password, user.password);
//     if (!isMatch)
//       return res
//         .status(400)
//         .json({ success: false, message: "Incorrect password" });

//     const hashedPassword = hashPassword(newPassword);
//     user.password = hashedPassword;
//     await user.save();

//     res.status(200).json({ success: true, message: "Password changed" });
//   } catch (e: any) {
//     console.log(e);
//     res.status(500).json({ success: false, message: e.message });
//   }
// };
