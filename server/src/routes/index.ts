import { Router } from 'express';
import { getPregunta, setResultado } from '../controller';
import scrapAll from '../scrapper';

const routes = Router();

// Nothing
routes.get('/', (req, res, next) => res.send('API ok'));

// Start scrapping process
routes.post('/scrap', [], scrapAll);

// Get random question
routes.get('/pregunta', [], getPregunta);

// Set pregunta results
routes.post('/resultado/:id([0-9]+)', [], setResultado);

export default routes;
