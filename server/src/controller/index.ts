import { Request, Response } from 'express';
import Pregunta from '../models/pregunta';
import { load } from 'cheerio';

export async function getPregunta(req: Request, res: Response) {
	// Find a random pregunta
	const pregunta = await Pregunta.createQueryBuilder('pregunta').innerJoinAndSelect('pregunta.publicacion', 'publicacion').orderBy('RANDOM()').getOne();

	// Scrap publicacion html from MeLi
	// Get html from url
	const response = await fetch(`https://articulo.mercadolibre.com.ar/MLA-${pregunta.publicacion.meLiId}`);
	const html = await response.text();

	// Load html for scrapping
	const $ = load(html);
	const htmlData = $('.ui-pdp-container--pdp');
	$('.ui-pdp-container__row--main-actions').remove();
	$('.ui-pdp-container__row--buy-benefits').remove();
	$('.ui-qadb__make-question-sa').remove();
	$('.ui-pdp-quick-access__container').remove();

	pregunta.publicacion.htmlData = htmlData.html();

	console.log('pregunta:', pregunta);
	res.send(pregunta);
}
