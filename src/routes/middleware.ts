import { Request, Response, NextFunction } from "express";

interface IMiddleware {
  (req: Request, res: Response, next: NextFunction): void
}

export const isAuthenticated: IMiddleware = (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.status(401).json({ msg: "Not authorized to view this resource" });
  }
};

export const isAdmin: IMiddleware = (req, res, next) => {
  if (req.isAuthenticated() && req.user.admin) {
    next();
  } else {
    res.status(401).json({ msg: "Not authorized to view this resource" });
  }
};