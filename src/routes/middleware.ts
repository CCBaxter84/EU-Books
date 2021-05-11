// Import libraries and dependencies
import { Request, Response, NextFunction } from "express";
import User from "../models/user";
import PasswordReset from "../models/passwordReset";

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
  if (!req.body.name) {
    res.render("authors/new", {
      error: "Please complete all form fields"
    });
  } else {
    next();
  }
};

// Check login form for completeness
export const loginFormChecker: IMiddleware = function(req, res, next) {
  if (!req.body.username || req.body.username === "") {
    res.render("auth/login", {
      csrfToken: req.csrfToken(),
      error: "Error: Username not provided"
    });
  } else if (!req.body.password || req.body.password === "") {
    res.render("auth/login", {
      csrfToken: req.csrfToken(),
      error: "Error: Password not provided"
    });
  } else {
    next();
  }
};

export const regFormChecker: IMiddleware = function(req, res, next) {
  if (!req.body.email || req.body.email === "") {
    res.render("auth/register", {
      csrfToken: req.csrfToken(),
      error: "Error: Email not provided"
    });
  } else if (!req.body.username || req.body.username === "") {
    res.render("auth/register", {
      csrfToken: req.csrfToken(),
      error: "Error: Username not provided"
    });
  } else if (!req.body.password  || req.body.password === "") {
    res.render("auth/register", {
      csrfToken: req.csrfToken(),
      error: "Error: Password not provided"
    });
  } else {
    next();
  }
}

export const checkForEmail: IMiddleware = function(req, res, next) {
  User.find({ email: req.body.email }, (error, user) => {
    if (error) {
      next(error);
    } else if (user.length >= 1) {
      res.render("auth/register", {
        csrfToken: req.csrfToken(),
        error: "Error: Email already registered"
      });
    } else {
      next();
    }
  });
}

export const checkForUserName: IMiddleware = function(req, res, next) {
  User.find({ username: req.body.username }, (error, user) => {
    if (error) {
      next(error);
    } else if (user.length >= 1) {
      res.render("auth/register", {
        csrfToken: req.csrfToken(),
        error: "Error: Username already registered"
      });
    } else {
      next();
    }
  });
};

export const checkResetForm: IMiddleware = function(req, res, next) {
  if (!req.body.email || req.body.email === "") {
    res.render("reset/reset", {
      csrfToken: req.csrfToken(),
      error: "Error: Email not provided"
    });
  } else {
    next();
  }
};

export const isValidEmail: IMiddleware = async function(req, res, next) {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      throw "Error: Invalid email"
    }
    next();
  } catch(error) {
    res.render("reset/reset", {
      csrfToken: req.csrfToken(),
      error: error
    });
  }
};

export const isValidToken: IMiddleware = async function(req, res, next) {
  try {
    const { token } = req.params;
    const passwordReset = await PasswordReset.findOne({ token });
    if (!passwordReset) {
      throw new Error();
    } else {
      next();
    }
  } catch {
    res.render("auth/login", {
      csrfToken: req.csrfToken(), isAuth: false,
      error: "Error: Invalid reset request"
    });
  }
};

export const passwordsNotEmpty: IMiddleware = function(req, res, next) {
  // Guard clause for empty passwords
  const { token } = req.params;
  if (!req.body.password || req.body.password === "" || !req.body.confirm || req.body.confirm === "") {
    res.render("reset/reset-confirm", {
      csrfToken: req.csrfToken(),
      error: "Error: Please ensure passwords fields are not empty.",
      token
    });
  } else {
    next();
  }
};

export const passwordsMatch: IMiddleware = function(req, res, next) {
  // Check if passwords match -- if yes, proceed
  const { token } = req.params;
  const { password, confirm } = req.body;
  if (password === confirm) {
    next();
  } else {
    res.render("reset/reset-confirm", {
      csrfToken: req.csrfToken(),
      error: "Error: Passwords do not match.",
      token
    });
  }
}