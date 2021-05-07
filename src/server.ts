// Import .env file if not in production
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

// Import npm libraries
import express, { Application } from "express";
import handlebars from "express-handlebars";
import Handlebars from "handlebars";
import methodOverride from "method-override";
import helmet from "helmet";
import session from "express-session";
import passport from "passport";


// Import functions and routers
import { getID, isAuthorMatch, getCoverPath, getDateString, getPubDate, formatDescription, isEraMatch, formatTags } from "./utils/hbsHelpers";
import { router as indexRouter } from "./routes/index";
import { router as authorRouter } from "./routes/author";
import { router as bookRouter } from "./routes/book";
import { connectToDB, sessionStore } from "./config/database";

// Set app and other variables
const app: Application = express();
const PORT = process.env.PORT || 5000;

// Connect to database
connectToDB();

// Configure app for body parsing, CRUD, session storage, and security
app.use(express.json());
app.use(express.urlencoded({ limit: '10mb', extended: false }));
app.use(methodOverride("_method"));
app.use(helmet());
app.use((req, res, next) => {
  res.setHeader(
    'Content-Security-Policy',
    "default-src 'self'; font-src 'self' https://fonts.gstatic.com https://fonts.googleapis.com; img-src * blob: data:; worker-src * blob:; script-src 'self' https://unpkg.com; style-src 'self' https://fonts.googleapis.com https://unpkg.com; frame-src 'self'"
  );
  next();
});
app.use(session({
  secret: "your mom",
  resave: false,
  saveUninitialized: true,
  store: sessionStore,
  cookie: {
    maxAge: 1000 * 30
  }
}));

// Configure routers
app.get("/", (req, res) => {
  res.send("Session: " + JSON.stringify(req.session));
})
//app.use("/", indexRouter);
app.use("/authors", authorRouter);
app.use("/books", bookRouter);

// Configure view
app.engine("hbs", handlebars({
  extname: "hbs",
  defaultLayout: "layout",
  layoutsDir: __dirname + "/../views/layouts",
  partialsDir: __dirname + "/../views/partials"
}));
app.set("views", __dirname + "/../views")
app.set("view engine", "hbs");

// Set Handlebars helpers
Handlebars.registerHelper("getURL", getID);
Handlebars.registerHelper("isAuthorMatch", isAuthorMatch);
Handlebars.registerHelper("getCoverPath", getCoverPath);
Handlebars.registerHelper("getDateString", getDateString);
Handlebars.registerHelper("getPubDate", getPubDate);
Handlebars.registerHelper("formatDescription", formatDescription);
Handlebars.registerHelper("isEraMatch", isEraMatch);
Handlebars.registerHelper("formatTags", formatTags);

// Serve up static assets
app.use(express.static(__dirname + "/../public"));

// Set the server to listen
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});