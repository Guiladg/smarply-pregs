"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setResultado = exports.getPregunta = void 0;
const pregunta_1 = __importDefault(require("../models/pregunta"));
const cheerio_1 = require("cheerio");
async function getPregunta(req, res) {
    // Find a random pregunta
    const pregunta = await pregunta_1.default.createQueryBuilder('pregunta')
        .innerJoinAndSelect('pregunta.publicacion', 'publicacion')
        .where('pregunta.resPublicacion IS NULL')
        .orderBy('RANDOM()')
        .getOne();
    // Scrap publicacion html from MeLi
    // Get html from url
    const response = await fetch(`https://articulo.mercadolibre.com.ar/MLA-${pregunta.publicacion.meLiId}`);
    const html = await response.text();
    // Load html for scrapping
    const $ = (0, cheerio_1.load)(html);
    const htmlData = $('.ui-pdp-container--pdp');
    $('.ui-pdp-container__row--main-actions').remove();
    $('.ui-pdp-container__row--buy-benefits').remove();
    $('.ui-qadb__make-question-sa').remove();
    $('.ui-pdp-quick-access__container').remove();
    pregunta.publicacion.htmlData = htmlData.html();
    console.log('pregunta:', pregunta);
    res.send(pregunta);
}
exports.getPregunta = getPregunta;
async function setResultado(req, res) {
    // Id parameter from URL
    const id = Number(req.params.id);
    // Data from body
    const { publicacion, formulario } = req.body;
    // Search record, if not found, return 404
    let record;
    try {
        record = await pregunta_1.default.findOneOrFail({ where: { id: id } });
    }
    catch (error) {
        return res.status(404).send();
    }
    // Edit temp record
    record.resPublicacion = publicacion;
    record.resFormulario = formulario;
    // Try to save the record
    try {
        await record.save();
    }
    catch (e) {
        return res.status(500).send();
    }
    // Return 200
    res.status(200).send();
}
exports.setResultado = setResultado;
