"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controller_1 = require("../controller");
const scrapper_1 = __importDefault(require("../scrapper"));
const routes = (0, express_1.Router)();
// Start scrapping process
routes.post('/scrap', [], scrapper_1.default);
// Get random question
routes.get('/pregunta', [], controller_1.getPregunta);
exports.default = routes;
