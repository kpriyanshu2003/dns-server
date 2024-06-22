import { Request } from "express";
import { JwtPayload } from "jsonwebtoken";

export interface CustomRequest extends Request {
  user?: {
    id: string;
    email: string;
    username: string;
  } & JwtPayload;
}
