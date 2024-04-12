import { test, expect } from "vitest";
import { getTemplatePath, processTemplate } from "../src/utils/templates";

test("getTemplatePath", () => {
  expect(getTemplatePath(1)).toBe("./templates/test.html");
  expect(getTemplatePath(2)).toBe("./templates/basic.html");
  expect(getTemplatePath(3)).toBe("./templates/template3.html");
});

test("processTemplate", async () => {
  const templateId = 1;
  const values = { name: "John Doe" };
  const expectedOutput = '<!DOCTYPE html><html lang="en"><head></head><body>John Doe</body></html>';
  const result = await processTemplate(templateId, values);
  expect(result).toBe(expectedOutput);
});
