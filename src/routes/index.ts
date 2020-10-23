import { Router } from 'express';
import appointmentsRouter from './appointments.routes';

const routes = Router();

/** routes.get('/', (request, response) => {
 *  return response.json({ message: 'oi' });
 *});
 */

routes.use('/appointments', appointmentsRouter);

export default routes;
