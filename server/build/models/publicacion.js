"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const pregunta_1 = __importDefault(require("./pregunta"));
let Publicacion = class Publicacion extends typeorm_1.BaseEntity {
    id;
    meLiId;
    cats;
    preguntas;
    // For retrieving from MeLi website
    htmlData;
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Publicacion.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'bigint' }),
    __metadata("design:type", Number)
], Publicacion.prototype, "meLiId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'simple-array' }),
    __metadata("design:type", Array)
], Publicacion.prototype, "cats", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => pregunta_1.default, (pregunta) => pregunta.publicacion),
    __metadata("design:type", Array)
], Publicacion.prototype, "preguntas", void 0);
Publicacion = __decorate([
    (0, typeorm_1.Entity)('publicacion'),
    (0, typeorm_1.Unique)(['meLiId'])
], Publicacion);
exports.default = Publicacion;
