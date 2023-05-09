import { Request, Response } from 'express';
import Pregunta from '../models/pregunta';
import { load } from 'cheerio';

export async function getPregunta(req: Request, res: Response) {
	// Find a random pregunta
	const pregunta = await Pregunta.createQueryBuilder('pregunta')
		.innerJoinAndSelect('pregunta.publicacion', 'publicacion')
		.where('pregunta.resPublicacion IS NULL')
		.orderBy('RANDOM()')
		.getOne();

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

export async function setResultado(req: Request, res: Response) {
	// Id parameter from URL
	const id = Number(req.params.id);

	// Data from body
	const { publicacion, formulario } = req.body;

	// Search record, if not found, return 404
	let record: Pregunta;
	try {
		record = await Pregunta.findOneOrFail({ where: { id: id } });
	} catch (error) {
		return res.status(404).send();
	}

	// Edit temp record
	record.resPublicacion = publicacion;
	record.resFormulario = formulario;

	// Try to save the record
	try {
		await record.save();
	} catch (e) {
		return res.status(500).send();
	}

	// Return 200
	res.status(200).send();
}
