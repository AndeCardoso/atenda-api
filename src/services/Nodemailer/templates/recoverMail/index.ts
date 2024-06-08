import fs from "fs";
import ejs from "ejs";
import path from "path";

const templatePath = path.join(__dirname, "index.ejs");

const recoverTemplateFile = fs.readFileSync(templatePath, "utf-8");

export const generateRecoverTemplateWithData = (recoverToken: string) => {
  const renderedTemplate = ejs.render(recoverTemplateFile, { recoverToken });

  return renderedTemplate;
};
