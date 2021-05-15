"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PASSWORD_REGEX = exports.EMAIL_REGEX = exports.INVALID_AUTHOR_ERR = exports.AUTHOR_HAS_BOOKS_ERR = exports.AUTHOR_EXISTS_ERR = exports.UNAUTH_REQ_ERR = exports.NOT_FOUND_ERR = exports.PAGE_ERR = exports.WEAK_PASSWORD_ERR = exports.INVALID_EMAIL_ERR = exports.USERNAME_EXISTS_ERR = exports.EMAIL_EXISTS_ERR = exports.DB_LOOKUP_ERR = exports.NO_EMAIL_ERR = exports.NO_PASSWORD_ERR = exports.NO_USERNAME_ERR = exports.EMPTY_FORM_ERR = void 0;
// Error Messages
exports.EMPTY_FORM_ERR = "Error: Please complete all form fields";
exports.NO_USERNAME_ERR = "Error: Username not provided";
exports.NO_PASSWORD_ERR = "Error: Password not provided";
exports.NO_EMAIL_ERR = "Error: Email not provided";
exports.DB_LOOKUP_ERR = "Error: Something went wrong with a lookup request";
exports.EMAIL_EXISTS_ERR = "Error: Email already registered";
exports.USERNAME_EXISTS_ERR = "Error: Username already registered";
exports.INVALID_EMAIL_ERR = "Error: Invalid email";
exports.WEAK_PASSWORD_ERR = "Error: Password must contain at least one lowercase, uppercase, numerical, and special character";
exports.PAGE_ERR = "Error: Something went wrong loading the page";
exports.NOT_FOUND_ERR = "Error: Not found";
exports.UNAUTH_REQ_ERR = "Error: Unauthorized Request";
exports.AUTHOR_EXISTS_ERR = "Error: Author already exists";
exports.AUTHOR_HAS_BOOKS_ERR = "Error: This author still has stored books";
exports.INVALID_AUTHOR_ERR = "Error: Author does not exist";
// Regular Expressions
exports.EMAIL_REGEX = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
exports.PASSWORD_REGEX = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-])/;
