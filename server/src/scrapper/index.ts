import categorias from './data';
import { load } from 'cheerio';
import { savePublicacion, savePregunta } from '../utils/saveData';
import { Request, Response } from 'express';

async function scrapCategorias(categorias: string[]): Promise<void> {
	for (const categoria of categorias) {
		await scrapCategoria(categoria);
	}
}

async function scrapCategoria(url: string): Promise<void> {
	// Get html from url
	const response = await fetch(url);
	const html = await response.text();

	// Load html for scrapping
	const $ = load(html);

	// Find all links to items
	const links = $('.shops__item-title');

	// Scrap each item
	for (const link of links) {
		const url = $(link).parent().attr('href');
		scrapPublicacion(url);
	}
}

async function scrapPublicacion(url: string): Promise<void> {
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
	const $ = load(html);

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
	const publicacion = await savePublicacion(Number(meLiId), cats);

	// Scrap questions for each item
	for (const preg of pregs) {
		const $preg = $(preg);
		const pregLink = $preg.next().attr('href');
		const pregId = pregLink.match(/(.*)(element_id=)(\d*)/)?.[3] ?? '';
		savePregunta(publicacion, Number(pregId), $preg.text());
	}
}

async function scrapAll(req: Request, res: Response) {
	scrapCategorias(categorias);
	res.send('Iniciando scraping');
}

export default scrapAll;
