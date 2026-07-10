import jwt, { Secret, SignOptions } from "jsonwebtoken";
import { env } from "../config/env.js";

export const generateToken = (userId: string) => {
  const secret: Secret = env.JWT_SECRET;

  const options: SignOptions = {
    expiresIn: "7d",
  };

  return jwt.sign({ userId }, secret, options);
};