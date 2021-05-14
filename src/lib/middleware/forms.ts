// Import libraries and dependencies
import { IMiddleware } from "./interface";
import User from "../../models/user";

export const authorFormChecker: IMiddleware = function(req, res, next) {
  if (!req.body.name) {
    res.render("authors/new", {
      error: "Please complete all form fields"
    });
  } else {
    next();
  }
};

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

export const isStrongPassword: IMiddleware = function(req, res, next) {
  try {
    if (!req.body.password || req.body.password.length < 12) {
      throw "Password must be at least 12 characters";
    }
    const regex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-])/;
    if (!regex.test(req.body.password)) {
      throw "Password must contain at least one lowercase, uppercase, numerical, and special character"
    }
    next();
  } catch(error) {
    res.render("auth/register", {
      csrfToken: req.csrfToken(),
      error: error
    });
  }
};

export const isEmail: IMiddleware = function(req, res, next) {
  try {
    const regex = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
    if (regex.test(req.body.email)) {
      next();
    } else {
      throw "Error: Must provided a valid email address"
    }
  } catch(error) {
    res.render("auth/register", {
      csrfToken: req.csrfToken(),
      error: error
    });
  }
};