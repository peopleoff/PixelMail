import * as fs from "fs";
import Handlebars from "./handlebars";

const templateIdToNameMap: { [key: string]: string } = {
  1: "test.html",
  2: "basic.html",
  3: "contactForm.hbs",
};

/**
 * Returns the path to the HTML template file based on the template ID.
 *
 * @param templateId - The ID of the template.
 * @returns The path to the HTML template file.
 */
export function getTemplatePath(templateId: number): string {
  const templateName = templateIdToNameMap[templateId];
  if (!templateName) {
    throw new Error("Invalid template ID");
  }
  const templatePath = `./templates/${templateIdToNameMap[templateId]}`;
  return templatePath;
}

/**
 * Processes an HTML template with given values.
 *
 * @param templatePath - The path to the HTML template file.
 * @param values - An object containing key-value pairs for template replacement.
 * @returns The processed HTML string.
 */
export function processTemplate(
  templateId: number,
  values: { [key: string]: any }
): string {
  try {
    const templatePath = getTemplatePath(templateId);
    const source = fs.readFileSync(templatePath, "utf8");
    const template = Handlebars.compile(source);
    return template({ data: values });
  } catch (error) {
    throw new Error(String(error));
  }
}
