import "dotenv/config";
import { app } from "./app";

const port = process.env.PORT;

app.listen(port, () => {
  console.log(`Atenda is working at port: ${port}`);
});
