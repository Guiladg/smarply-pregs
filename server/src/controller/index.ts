import { Request, Response } from 'express';
import Pregunta from '../models/pregunta';
import { load } from 'cheerio';

export async function getPregunta(req: Request, res: Response) {
	// Find a random pregunta
	const pregunta = await Pregunta.createQueryBuilder('pregunta').innerJoinAndSelect('pregunta.publicacion', 'publicacion').orderBy('RANDOM()').getOne();
	// Remove foreign reference from publicacion
	delete pregunta.publicacion.preguntas;

	// Scrap publicacion html from MeLi
	// Get html from url
	const response = await fetch(`https://articulo.mercadolibre.com.ar/MLA-${pregunta.publicacion.meLiId}`);
	const html = await response.text();

	// Load html for scrapping
	const $ = load(html);
	const htmlData = $('.ui-pdp-container--pdp').html();

	pregunta.publicacion.htmlData = htmlData;

	console.log('pregunta:', pregunta);
	res.send(pregunta);
}
