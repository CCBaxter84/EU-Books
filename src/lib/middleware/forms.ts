// Import libraries and dependencies
import { Form, IMiddleware } from "../types";
import User from "../../models/user";
import { hasValue, renderForm, isComplexPassword, isLongPassword } from "../form-utils";
import { EMAIL_EXISTS_ERR, EMPTY_FORM_ERR, NO_EMAIL_ERR, INVALID_EMAIL_ERR, USERNAME_EXISTS_ERR, DB_LOOKUP_ERR, NO_PASSWORD_ERR, NO_USERNAME_ERR, WEAK_PASSWORD_ERR, EMAIL_REGEX } from "../global-constants";

export const authorFormChecker: IMiddleware = function(req, res, next) {
  const form: Form = "authors/new";
  const isAuth = req.isAuthenticated();
  if (hasValue("name", req)) {
    next();
  } else {
    res.render(form, {
      csrfToken: req.csrfToken(),
      error: EMPTY_FORM_ERR,
      isAuth: isAuth
    });
  }
};

export const loginFormChecker: IMiddleware = function(req, res, next) {
  const form: Form = "auth/login";
  if ( !hasValue("username", req) && !hasValue("password", req)) {
    renderForm(form, req, res, EMPTY_FORM_ERR);
  } else if ( !hasValue("username", req) ) {
    renderForm(form, req, res, NO_USERNAME_ERR);
  } else if ( !hasValue("password", req) ) {
    renderForm(form, req, res, NO_PASSWORD_ERR);
  } else {
    next();
  }
};

export const regFormChecker: IMiddleware = function(req, res, next) {
  const form: Form = "auth/register";
  if ( !hasValue("email", req) && !hasValue("username", req) || !hasValue("password", req)) {
    renderForm(form, req, res, EMPTY_FORM_ERR);
  } else if ( !hasValue("email", req) ) {
    renderForm(form, req, res, NO_EMAIL_ERR);
  } else if ( !hasValue("username", req) ) {
    renderForm(form, req, res, NO_USERNAME_ERR);
  } else if ( !hasValue("password", req) ) {
    renderForm(form, req, res, NO_PASSWORD_ERR);
  } else {
    next();
  }
}

export const checkForEmail: IMiddleware = function(req, res, next) {
  const form: Form = "auth/register";
  User.find({ email: req.body.email }, (error, user) => {
    if (error) {
      renderForm(form, req, res, DB_LOOKUP_ERR);
    } else if (user.length >= 1) {
      renderForm(form, req, res, EMAIL_EXISTS_ERR);
    } else {
      next();
    }
  });
}

export const checkForUserName: IMiddleware = function(req, res, next) {
  const form: Form = "auth/register";
  User.find({ username: req.body.username }, (error, user) => {
    if (error) {
      renderForm(form, req, res, DB_LOOKUP_ERR);
    } else if (user.length >= 1) {
      renderForm(form, req, res, USERNAME_EXISTS_ERR);
    } else {
      next();
    }
  });
};

export const checkResetForm: IMiddleware = function(req, res, next) {
  const form = "reset/reset";
  if ( !hasValue("email", req) ) {
    renderForm(form, req, res, NO_EMAIL_ERR);
  } else {
    next();
  }
};

export const isValidEmail: IMiddleware = async function(req, res, next) {
  const form: Form = "reset/reset";
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      throw INVALID_EMAIL_ERR;
    }
    next();
  } catch(err) {
    const error = err === INVALID_EMAIL_ERR ? INVALID_EMAIL_ERR : DB_LOOKUP_ERR;
    renderForm(form, req, res, error);
  }
};

export const passwordsNotEmpty: IMiddleware = function(req, res, next) {
  const { token } = req.params;
  const form: Form = "reset/reset-confirm";
  if ( !hasValue("password", req) || !hasValue("confirm", req) ) {
    renderForm(form, req, res, NO_PASSWORD_ERR, token);
  } else {
    next();
  }
};

export const isStrongPassword: IMiddleware = function(req, res, next) {
  const form = "auth/register";
  const minPasswordLength = 12;
  const { password } = req.body;
  const shortPasswordErr = `Password must be at least ${minPasswordLength} characters`;

  if ( !isLongPassword(password, minPasswordLength) ) {
    renderForm(form, req, res, shortPasswordErr);
  } else if ( !isComplexPassword(password) ) {
    renderForm(form, req, res, WEAK_PASSWORD_ERR);
  } else {
    next();
  }
};

export const isEmail: IMiddleware = function(req, res, next) {
  const form = "auth/register";
  if (EMAIL_REGEX.test(req.body.email)) {
    next();
  } else {
    renderForm(form, req, res, INVALID_EMAIL_ERR);
  }
};