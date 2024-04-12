"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const templates_1 = require("../src/utils/templates");
(0, vitest_1.test)("getTemplatePath", () => {
    (0, vitest_1.expect)((0, templates_1.getTemplatePath)(1)).toBe("./templates/test.html");
    (0, vitest_1.expect)((0, templates_1.getTemplatePath)(2)).toBe("./templates/basic.html");
    (0, vitest_1.expect)((0, templates_1.getTemplatePath)(3)).toBe("./templates/template3.html");
});
(0, vitest_1.test)("processTemplate", () => __awaiter(void 0, void 0, void 0, function* () {
    const templateId = 1;
    const values = { name: "John Doe" };
    const expectedOutput = '<!DOCTYPE html><html lang="en"><head></head><body>John Doe</body></html>';
    const result = yield (0, templates_1.processTemplate)(templateId, values);
    (0, vitest_1.expect)(result).toBe(expectedOutput);
}));
