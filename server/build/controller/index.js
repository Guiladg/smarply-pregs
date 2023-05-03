"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPregunta = void 0;
const pregunta_1 = __importDefault(require("../models/pregunta"));
const cheerio_1 = require("cheerio");
async function getPregunta(req, res) {
    // Find a random pregunta
    const pregunta = await pregunta_1.default.createQueryBuilder('pregunta').innerJoinAndSelect('pregunta.publicacion', 'publicacion').orderBy('RANDOM()').getOne();
    // Scrap publicacion html from MeLi
    // Get html from url
    const response = await fetch(`https://articulo.mercadolibre.com.ar/MLA-${pregunta.publicacion.meLiId}`);
    const html = await response.text();
    // Load html for scrapping
    const $ = (0, cheerio_1.load)(html);
    const htmlData = $('.ui-pdp-container--pdp').html();
    pregunta.publicacion.htmlData = htmlData;
    console.log('pregunta:', pregunta);
    res.send(pregunta);
}
exports.getPregunta = getPregunta;
