import "dotenv/config";
import { app } from "./app";
import { sequelize } from "./db";

const port = process.env.PORT;

(async () => {
  await sequelize.sync();
})();

app.listen(port, () => {
  console.log(`Atenda is working at port: ${port}`);
});
