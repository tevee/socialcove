// adds short userinfo to request

import { Request, Response, NextFunction } from "express";
import { getItemById } from "../utils.js";
import { read } from "../dataAccess.js";

async function addUserInfo(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const users = await read.users();

    const user = getItemById(users, req.params.userId);

    req.body.user = {
      id: user.id,
      username: user.username,
      userImage: user.userImage,
    };
  } catch (err) {
    //skip straight to afterware
    return next(err);
  }
  next();
}

export { addUserInfo };
