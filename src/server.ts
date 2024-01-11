import dotenv from "dotenv";
import { app } from "./app";
dotenv.config();

const port = 8888;

app.listen(port, () => {
  console.log(`Atenda is working at port: ${port}`);
});
