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

// Import functions and routers
import { getID, putURL, postURL, isAuthorMatch } from "./hbsHelpers";
import { router as indexRouter } from "./routes/index";
import { router as authorRouter } from "./routes/author";
import { router as bookRouter } from "./routes/book";
import { connectToDB } from "./database";

// Set app and other variables
const app: Application = express();
const PORT = process.env.PORT || 5000;

// Configure app for body parsing, CRUD, and security
app.use(express.json());
app.use(express.urlencoded({ limit: '10mb', extended: false }));
app.use(methodOverride("_method"));
app.use(helmet());
app.use((req, res, next) => {
  res.setHeader(
    'Content-Security-Policy',
    "default-src 'self'; font-src 'self' https://fonts.gstatic.com https://fonts.googleapis.com; img-src * blob:; worker-src * blob:; script-src 'self' https://unpkg.com; style-src 'self' https://fonts.googleapis.com https://unpkg.com; frame-src 'self'"
  );
  next();
});

// Configure routers
app.use("/", indexRouter);
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
Handlebars.registerHelper("putURL", putURL);
Handlebars.registerHelper("postURL", postURL);
Handlebars.registerHelper("isAuthorMatch", isAuthorMatch);

// Serve up static assets
app.use(express.static(__dirname + "/../public"));

// Connect to database
connectToDB();

// Set the server to listen
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});