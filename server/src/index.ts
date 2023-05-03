import * as dotenv from 'dotenv';
import { DataSource, LogLevel } from 'typeorm';
import express from 'express';
import * as bodyParser from 'body-parser';
import helmet from 'helmet';
import cors from 'cors';
import routes from './routes/';
import path from 'path';
import { AddressInfo } from 'net';

// Load .env file
dotenv.config();

// Establish database connection
export const dataSource = new DataSource({
	host: process.env.DB_HOST,
	port: Number(process.env.DB_PORT),
	username: process.env.DB_USER,
	password: process.env.DB_PASSWORD,
	database: process.env.DB_NAME,
	type: process.env.DB_TYPE as any,
	synchronize: true,
	logging: ['error', ...((process.env.NODE_ENV !== 'production' ? ['query'] : []) as LogLevel[])],
	logger: 'simple-console',
	entities: [__dirname + '/**/models/*.{ts,js}'],
	timezone: 'Z'
});

dataSource.initialize().then(async () => {
	// Start express
	const app = express();

	// Middlewares
	app.use(cors({ origin: true, credentials: true }));
	app.use(helmet());
	app.use(bodyParser.json());

	// API routes
	app.use(path.join('/', process.env.API_ROUTE ?? '').replace('\\', '/'), routes);

	// Start listening requests
	const server = app.listen(process.env.PORT, () => {
		const address = server.address() as AddressInfo;
		console.info(`\nServer started on port ${address.port}.`);
		console.info(`Api URL: ${path.join(process.env.URL, process.env.API_ROUTE ?? '', '/')}.`);
		console.info(`App root folder: ${__dirname}. \n`);
	});
});
