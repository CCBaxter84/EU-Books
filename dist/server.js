"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Import .env file if not in production
if (process.env.NODE_ENV !== "production") {
    require("dotenv").config();
}
// Import npm libraries
var express_1 = __importDefault(require("express"));
var express_handlebars_1 = __importDefault(require("express-handlebars"));
var handlebars_1 = __importDefault(require("handlebars"));
var method_override_1 = __importDefault(require("method-override"));
var express_session_1 = __importDefault(require("express-session"));
var passport_1 = __importDefault(require("./config/passport"));
var helmet_1 = __importDefault(require("helmet"));
var csurf_1 = __importDefault(require("csurf"));
var express_mongo_sanitize_1 = __importDefault(require("express-mongo-sanitize"));
// Import functions and routers
var handlebars_2 = require("./lib/handlebars");
var index_1 = require("./routes/index");
var author_1 = require("./routes/author");
var book_1 = require("./routes/book");
var login_1 = require("./routes/login");
var registration_1 = require("./routes/registration");
var reset_1 = require("./routes/reset");
var reset_confirm_1 = require("./routes/reset-confirm");
var verify_1 = require("./routes/verify");
var database_1 = require("./config/database");
var error_utils_1 = require("./lib/error-utils");
var csurf_2 = __importDefault(require("csurf"));
// Set app and other variables
var app = express_1.default();
var PORT = process.env.PORT || 5000;
// Connect to database
database_1.connectToDB();
// Configure app for body parsing & CRUD support
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ limit: '10mb', extended: false }));
app.use(method_override_1.default("_method"));
// Configure app for session storage and authentication state management
app.use(express_session_1.default({
    secret: "your mom",
    name: "my-session",
    resave: false,
    saveUninitialized: true,
    store: database_1.sessionStore,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24,
        sameSite: "strict"
    }
}));
app.use(passport_1.default.initialize());
app.use(passport_1.default.session());
// Configure app for security against XSS, CSRF, NoSQL Injection, and other threats
app.use(helmet_1.default());
app.use(process.env.NODE_ENV === "test" ?
    csurf_2.default({ ignoreMethods: ["GET", "POST", "DELETE"] }) :
    csurf_1.default());
app.use(express_mongo_sanitize_1.default());
app.use(function (req, res, next) {
    res.setHeader('Content-Security-Policy', "default-src 'self'; font-src 'self' https://fonts.gstatic.com https://fonts.googleapis.com; img-src * blob: data:; worker-src * blob:; script-src 'self' https://unpkg.com; style-src 'self' https://fonts.googleapis.com https://unpkg.com; frame-src 'self'");
    next();
});
// Configure routers
app.use("/authors", author_1.router);
app.use("/books", book_1.router);
app.use("/login", login_1.router);
app.use("/registration", registration_1.router);
app.use("/reset", reset_1.router);
app.use("/reset-confirm", reset_confirm_1.router);
app.use("/verify", verify_1.router);
app.use("/", index_1.router);
// Configure view
app.engine("hbs", express_handlebars_1.default({
    extname: "hbs",
    defaultLayout: "layout",
    layoutsDir: __dirname + "/../views/layouts",
    partialsDir: __dirname + "/../views/partials"
}));
app.set("views", __dirname + "/../views");
app.set("view engine", "hbs");
// Set Handlebars helpers
handlebars_1.default.registerHelper("getURL", handlebars_2.getURL);
handlebars_1.default.registerHelper("getTokenURL", handlebars_2.getTokenURL);
handlebars_1.default.registerHelper("isAuthorMatch", handlebars_2.isAuthorMatch);
handlebars_1.default.registerHelper("getCoverPath", handlebars_2.getCoverPath);
handlebars_1.default.registerHelper("getDateString", handlebars_2.getDateString);
handlebars_1.default.registerHelper("getPubDate", handlebars_2.getPubDate);
handlebars_1.default.registerHelper("formatDescription", handlebars_2.formatDescription);
handlebars_1.default.registerHelper("isEraMatch", handlebars_2.isEraMatch);
handlebars_1.default.registerHelper("formatTags", handlebars_2.formatTags);
handlebars_1.default.registerHelper("isLoggedIn", handlebars_2.isLoggedIn);
// Serve up static assets
app.use(express_1.default.static(__dirname + "/../public"));
// Catch all Error Handler for bad requests
app.use(function (req, res) {
    var isAuth = req.user ? true : false;
    error_utils_1.renderError("not-found", res, isAuth);
});
// Set the server to listen
app.listen(PORT, function () {
    console.log("Server is listening on port " + PORT);
});
// Export app for testing
exports.default = app;
