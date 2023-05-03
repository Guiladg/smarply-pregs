"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.savePregunta = exports.savePublicacion = void 0;
const pregunta_1 = __importDefault(require("../models/pregunta"));
const publicacion_1 = __importDefault(require("../models/publicacion"));
async function savePublicacion(meLiId, cats) {
    const exists = await publicacion_1.default.findOneBy({ meLiId });
    if (exists) {
        return exists;
    }
    const newRecord = new publicacion_1.default();
    newRecord.meLiId = meLiId;
    newRecord.cats = cats;
    return newRecord.save();
}
exports.savePublicacion = savePublicacion;
async function savePregunta(publicacion, pregId, texto) {
    const exists = await pregunta_1.default.findOneBy({ pregId });
    if (exists) {
        return exists;
    }
    const newRecord = new pregunta_1.default();
    newRecord.publicacion = publicacion;
    newRecord.pregId = pregId;
    newRecord.texto = texto;
    return newRecord.save();
}
exports.savePregunta = savePregunta;
