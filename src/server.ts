// Import dependencies
import express, { Application } from "express";

// Set app and other variables
const app: Application = express();
const PORT = 5000;

// Configure app
app.use(express.json());

// Set the server to listen
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});