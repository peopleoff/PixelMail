"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.processTemplate = exports.getTemplatePath = void 0;
const fs = __importStar(require("fs"));
const Handlebars = __importStar(require("handlebars"));
const templateIdToNameMap = {
    1: "test.html",
    2: "basic.html",
    3: "template3.html",
    // Add more mappings as needed
};
/**
 * Returns the path to the HTML template file based on the template ID.
 *
 * @param templateId - The ID of the template.
 * @returns The path to the HTML template file.
 */
function getTemplatePath(templateId) {
    const templatePath = `./templates/${templateIdToNameMap[templateId]}`;
    return templatePath;
}
exports.getTemplatePath = getTemplatePath;
/**
 * Processes an HTML template with given values.
 *
 * @param templatePath - The path to the HTML template file.
 * @param values - An object containing key-value pairs for template replacement.
 * @returns The processed HTML string.
 */
function processTemplate(templateId, values) {
    const templatePath = getTemplatePath(templateId);
    const source = fs.readFileSync(templatePath, "utf8");
    const template = Handlebars.compile(source);
    return template(values);
}
exports.processTemplate = processTemplate;
