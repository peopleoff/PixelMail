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

export default Handlebars;
