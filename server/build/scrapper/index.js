"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const data_1 = __importDefault(require("./data"));
const cheerio_1 = require("cheerio");
const saveData_1 = require("../utils/saveData");
async function scrapCategorias(categorias) {
    for (const categoria of categorias) {
        await scrapCategoria(categoria);
    }
}
async function scrapCategoria(url) {
    // Get html from url
    const response = await fetch(url);
    const html = await response.text();
    // Load html for scrapping
    const $ = (0, cheerio_1.load)(html);
    // Find all links to items
    const links = $('.shops__item-title');
    // Scrap each item
    for (const link of links) {
        const url = $(link).parent().attr('href');
        try {
            scrapPublicacion(url);
        }
        catch (e) {
            console.info('Error', e);
        }
    }
}
async function scrapPublicacion(url) {
    // Get MeLiId from url
    const meLiId = url.match(/(.*)(MLA-)([\d]+)/)?.[3] ?? '';
    if (!meLiId) {
        return;
    }
    // Create URL for retrieving questions
    //? const url = 'https://articulo.mercadolibre.com.ar/noindex/questions/MLA' + MeLiId;
    console.info('Scrapping:', url);
    // Get html from url
    const response = await fetch(url);
    const html = await response.text();
    // Load html for scrapping
    const $ = (0, cheerio_1.load)(html);
    // Find category name
    const catEls = $('.andes-breadcrumb__item');
    const cats = [];
    for (const catEl of catEls) {
        cats.push($(catEl).text());
    }
    // Find all questions
    //? const pregs = $('.ui-pdp-questions__questions-list__question');
    const pregs = $('.ui-pdp-qadb__questions-list__question__label');
    // Save item
    const publicacion = await (0, saveData_1.savePublicacion)(Number(meLiId), cats);
    // Scrap questions for each item
    for (const preg of pregs) {
        const $preg = $(preg);
        const pregLink = $preg.next().attr('href');
        const pregId = pregLink.match(/(.*)(element_id=)(\d*)/)?.[3] ?? '';
        (0, saveData_1.savePregunta)(publicacion, Number(pregId), $preg.text());
    }
}
async function scrapAll(req, res) {
    scrapCategorias(data_1.default);
    res.send('Iniciando scraping');
}
exports.default = scrapAll;
