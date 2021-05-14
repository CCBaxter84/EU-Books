// Error Messages
export const EMPTY_FORM_ERR = "Error: Please complete all form fields";
export const NO_USERNAME_ERR = "Error: Username not provided";
export const NO_PASSWORD_ERR = "Error: Password not provided";
export const NO_EMAIL_ERR = "Error: Email not provided";
export const DB_LOOKUP_ERR = "Error: Something went wrong with a lookup request";
export const EMAIL_EXISTS_ERR = "Error: Email already registered";
export const USERNAME_EXISTS_ERR = "Error: Username already registered";
export const INVALID_EMAIL_ERR = "Error: Invalid email";
export const WEAK_PASSWORD_ERR = "Error: Password must contain at least one lowercase, uppercase, numerical, and special character";
export const PAGE_ERR = "Error: Something went wrong loading the page";
export const BAD_REQ_ERR = "Error: Bad Request";
export const AUTHOR_EXISTS_ERR = "Error: Author already exists";
export const AUTHOR_HAS_BOOKS_ERR = "Error: This author still has stored books";
export const INVALID_AUTHOR_ERR = "Error: Author does not exist";

// Regular Expressions
export const EMAIL_REGEX: RegExp = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
export const PASSWORD_REGEX = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-])/;