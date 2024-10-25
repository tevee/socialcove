// adds timestamp to request

import { Request, Response, NextFunction } from "express";
import dayjs from "dayjs";

function addTimestamp(req: Request, res: Response, next: NextFunction): void {
  req.body.timestamp = dayjs().toJSON();
  next();
}

export { addTimestamp };
