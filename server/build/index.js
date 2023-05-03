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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.dataSource = void 0;
const dotenv = __importStar(require("dotenv"));
const typeorm_1 = require("typeorm");
const express_1 = __importDefault(require("express"));
const bodyParser = __importStar(require("body-parser"));
const helmet_1 = __importDefault(require("helmet"));
const cors_1 = __importDefault(require("cors"));
const routes_1 = __importDefault(require("./routes/"));
const path_1 = __importDefault(require("path"));
// Load .env file
dotenv.config();
// Establish database connection
exports.dataSource = new typeorm_1.DataSource({
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    type: process.env.DB_TYPE,
    synchronize: true,
    logging: ['error', ...(process.env.NODE_ENV !== 'production' ? ['query'] : [])],
    logger: 'simple-console',
    entities: [__dirname + '/**/models/*.{ts,js}'],
    timezone: 'Z'
});
exports.dataSource.initialize().then(async () => {
    // Start express
    const app = (0, express_1.default)();
    // Middlewares
    app.use((0, cors_1.default)({ origin: true, credentials: true }));
    app.use((0, helmet_1.default)());
    app.use(bodyParser.json());
    // API routes
    app.use(path_1.default.join('/', process.env.API_ROUTE ?? '').replace('\\', '/'), routes_1.default);
    // Start listening requests
    const server = app.listen(process.env.PORT, () => {
        const address = server.address();
        console.info(`\nServer started on port ${address.port}.`);
        console.info(`Api URL: ${path_1.default.join(process.env.URL, process.env.API_ROUTE ?? '', '/')}.`);
        console.info(`App root folder: ${__dirname}. \n`);
    });
});
