// Import libraries and dependencies
import { Request, Response, NextFunction } from "express";

// Interfaces
interface IMiddleware {
  (req: Request, res: Response, next: NextFunction): void
}

// Middleware for checking user authentication
export const isAuthenticated: IMiddleware = (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.status(401).json({ msg: "Not authorized to view this resource" });
  }
};

export const isNotAlreadyLoggedIn: IMiddleware = (req, res, next) => {
  if (req.isAuthenticated()) {
    res.redirect("/");
  } else {
    next();
  }
};

// Middleware for checking whether user is an admin
export const isAdmin: IMiddleware = (req, res, next) => {
  if (req.isAuthenticated() && req.user.admin) {
    next();
  } else {
    res.status(401).json({ msg: "Not authorized to view this resource" });
  }
};

// Middleware for checking author post and put requests
export const authorFormChecker: IMiddleware = function(req, res, next) {
  if (req.body.name === "" || !req.body.name) {
    res.render("authors/new", {
      error: "Please complete all form fields"
    });
  } else {
    next();
  }
};

// Check login form for completeness
export const loginFormChecker: IMiddleware = function(req, res, next) {
  if (req.body.username === "" || !req.body.username) {
    res.render("auth/login", {
      csrfToken: req.csrfToken(),
      error: "Error: Username not provided"
    });
  } else if (req.body.password === "" || !req.body.password) {
    res.render("auth/login", {
      csrfToken: req.csrfToken(),
      error: "Error: Password not provided"
    });
  } else {
    next();
  }
};