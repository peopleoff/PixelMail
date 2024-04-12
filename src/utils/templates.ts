import * as fs from "fs";
import * as Handlebars from "handlebars";

// Register a helper that returns the current timestamp
Handlebars.registerHelper("timestamp", function () {
  return new Date().toLocaleString(); // You can customize this format
});

// Register a helper to format key names
Handlebars.registerHelper("formatKey", function (key) {
  // Replace underscores with spaces and split camelCase
  return (
    key
      // Insert a space before all caps in camelCase and replace underscores
      .replace(/([A-Z])|(_)/g, function (match: any, p1: string, p2: any) {
        return (p2 ? " " : " ") + (p1 ? p1.toUpperCase() : "");
      })
      // Capitalize the first letter of each word
      .replace(/^./, function (str: string) {
        return str.toUpperCase();
      })
  );
});

// Register a helper to extract the domain name from a URL
Handlebars.registerHelper("domainFromUrl", function (referer) {
  try {
    const parsedUrl = new URL(referer); // Parse the URL using the URL constructor
    return parsedUrl.hostname; // Return the domain name part
  } catch (e) {
    return "Invalid URL"; // Return a default message if URL parsing fails
  }
});

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
  values: { [key: string]: any },
  referer?: string
): string {
  try {
    const templatePath = getTemplatePath(templateId);
    const source = fs.readFileSync(templatePath, "utf8");
    const template = Handlebars.compile(source);
    return template({ data: values, referer });
  } catch (error) {
    throw new Error(String(error));
  }
}
