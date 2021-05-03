// Import dependencies
import { Router, Request, Response } from "express";
import Author, { IAuthor } from "../models/author";
import Book from "../models/book";

// Define interfaces
interface IParams {
  name?: RegExp
}

// Define and export router
export const router = Router();

// @route GET /authors
// @desc  Render Search Author form and books by author
router.get("/", async (req: Request, res: Response) => {
  // Set search options to regex based on req.query
  let searchOptions: IParams = {};
  if (req.query.name !== "" && req.query.name != null) {
    const name: string = "" + req.query.name;
    searchOptions.name = new RegExp(name, "i");
  }

  try {
    const authors = await Author.find(searchOptions).lean();
    res.render("authors/index", {
      authors,
      searchOptions: req.query
    });
  } catch {
    res.redirect("/");
  }
});

// @route GET /authors/new
// @desc  Render form for adding a new author to screen
router.get("/new", (req: Request, res: Response) => {
  res.render("authors/new", { author: new Author() });
});

// @route POST /authors
// @desc  Add a new author to the database
router.post("/", async (req: Request, res: Response) => {
  let author = new Author({
    name: req.body.name
  });
  try {
    const newAuthor = await author.save();
    res.redirect(`/authors/${newAuthor._id}`);
  } catch {
    res.redirect("/authors");
  }
});

// @route GET /authors/:id
// @desc  Render info for an existing author to screen
router.get("/:id", async (req: Request, res: Response) => {
  try {
    const author = await Author.findById(req.params.id).lean();
    const books = await Book.find({ author: author?._id }).lean();
    res.render("authors/show", {
      author: author,
      books: books
    });
  } catch {
    res.redirect("/");
  }
});

// @route GET /authors/:id/edit
// @desc  Render form for editing name of existing author
router.get("/:id/edit", async (req: Request, res: Response) => {
  try {
    const author = await Author.findById(req.params.id).lean();
    res.render("authors/edit", {
      author
    });
  } catch {
    res.redirect("/");
  }
});

// @route PUT /authors/:id
// @desc  Update an existing author entry in the database
router.put("/:id", async (req: Request, res: Response) => {
  let author: IAuthor|null = null;
  try {
    author = await Author.findById(req.params.id);
    if (author == null) throw "Author not found";
    author.name = req.body.name;
    await author.save();
    res.redirect(`/authors/${req.params.id}`);
  } catch {
    if (author == null) {
      res.redirect("/");
    } else {
      res.redirect(`/authors/${author._id}`);
    }
  }
});

// @route DELETE /authors/:id
// @desc  Remove an author from the database
// *Include a check to prevent deleting an author ASW books
router.delete("/:id", async (req: Request, res: Response) => {
  let author: IAuthor|null = null;
  try {
    author = await Author.findById(req.params.id);
    await author?.remove();
    res.redirect("/authors");
  } catch(err) {
    console.log(err);
    if (author === null) {
      res.redirect("/");
    } else {
      res.redirect(`/authors/${author.id}`);
    }
  }
});