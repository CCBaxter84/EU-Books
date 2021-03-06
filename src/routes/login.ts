// Import dependencies
import { Router, Request, Response, NextFunction } from "express";
import passport from "../config/passport";
import { isNotAlreadyLoggedIn } from "../lib/middleware/auth";
import { loginFormChecker } from "../lib/middleware/forms";
import { renderError } from "../lib/error-utils";

// Define and export router
export const router = Router();

// @route   GET /login
// @desc    Render Log In form
// @access  Public
router.get("/", isNotAlreadyLoggedIn, (req: Request, res: Response) => {
  res.render("auth/login",
    { csrfToken: req.csrfToken(), isAuth: false }
  );
});

// @route   POST /login
// @desc    Submit and authenticate username and password
// @access  Public
router.post("/", loginFormChecker, (req: Request, res: Response, next: NextFunction) => {
  passport.authenticate("local", (error, user, info) => {
    if (error) {
      res.render("auth/login", {
        error: error,
        csrfToken: req.csrfToken()
      });
    } else if (!user) {
      res.render("auth/login", {
        error: "Error: Invalid username or password",
        csrfToken: req.csrfToken()
      });
    } else {
      user.save();
      req.logIn(user, error => {
        if (error) {
          renderError("server-err", res, false);
        }
        res.redirect("/");
      });
    }
  })(req, res, next);
});



