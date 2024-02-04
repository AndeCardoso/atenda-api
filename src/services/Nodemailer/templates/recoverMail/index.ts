import fs from "fs";
import path from "path";

const templatePath = path.join(__dirname, "recover.html");
export const recoverTemplateFile = fs.readFileSync(templatePath, "utf-8");
