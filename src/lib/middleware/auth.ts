// Import libraries and dependencies
import { IMiddleware } from "../types-interfaces";
import PasswordReset from "../../models/passwordReset";
import UserVerification from "../../models/userVerification";

// Middleware for checking user authentication
export const isAuthenticated: IMiddleware = (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
  } else {
    // Update this to render a funny 401 Error View
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

export const isValidResetToken: IMiddleware = async function(req, res, next) {
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

export const isValidVerifyToken: IMiddleware = async function(req, res, next) {
  try {
    const { token } = req.params;
    const userVerification = await UserVerification.findOne({ token });
    if (!userVerification) {
      throw new Error();
    } else {
      next();
    }
  } catch {
    res.render("main", {
      csrfToken: req.csrfToken(), isAuth: false,
      error: "Error: Invalid verify request"
    });
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