import { Router } from 'express';
import { getPregunta } from '../controller';
import scrapAll from '../scrapper';

const routes = Router();

// Start scrapping process
routes.post('/scrap', [], scrapAll);

// Get random question
routes.get('/pregunta', [], getPregunta);

export default routes;
