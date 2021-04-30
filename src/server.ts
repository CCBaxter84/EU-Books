// Import .env file if not in production
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

// Import dependencies
import express, { Application } from "express";
import Handlebars from "handlebars";
import handlebars from "express-handlebars";
import methodOverride from "method-override";
import { router as indexRouter } from "./routes/index";
import { router as authorRouter } from "./routes/author";
import { router as bookRouter } from "./routes/book";
import { IAuthor } from "./models/author";
import { IBook } from "./models/book";
import { connectToDB } from "./database";

// Set app and other variables
const app: Application = express();
const PORT = process.env.PORT || 5000;

// Configure app
app.use(express.json());
app.use(express.urlencoded());
app.use(methodOverride("_method"));

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

// Set customer Handlebars helpers
Handlebars.registerHelper("stars", function(blah) {
  return blah;
});
Handlebars.registerHelper("getURL", function(model: IAuthor|IBook, isAuthor: boolean) {
  if (isAuthor) {
    return `/authors/${model._id}`;
  } else {
    return `/books/${model._id}`;
  }
});

// Serve up static assets
app.use(express.static(__dirname + "/../public"));
console.log(__dirname + "/../public");

// Connect to database
connectToDB();

// Set the server to listen
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});