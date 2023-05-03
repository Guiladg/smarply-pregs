import Pregunta from '../models/pregunta';
import Publicacion from '../models/publicacion';

export async function savePublicacion(meLiId: number, cats: string[]): Promise<Publicacion> {
	const exists = await Publicacion.findOneBy({ meLiId });
	if (exists) {
		return exists;
	}
	const newRecord = new Publicacion();
	newRecord.meLiId = meLiId;
	newRecord.cats = cats;
	return newRecord.save();
}

export async function savePregunta(publicacion: Publicacion, pregId: number, texto: string): Promise<Pregunta> {
	const exists = await Pregunta.findOneBy({ pregId });
	if (exists) {
		return exists;
	}
	const newRecord = new Pregunta();
	newRecord.publicacion = publicacion;
	newRecord.pregId = pregId;
	newRecord.texto = texto;
	return newRecord.save();
}
