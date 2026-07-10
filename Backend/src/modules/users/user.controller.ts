import { Response } from "express";
import { AuthRequest } from "../../middleware/auth.middleware.js";
import { getCurrentUser } from "./user.service.js";

export const me = async (
  req: AuthRequest,
  res: Response
) => {

  const user = await getCurrentUser(req.user!.userId);

  return res.json({
    success: true,
    data: user,
  });

};