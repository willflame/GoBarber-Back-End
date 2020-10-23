import { Router } from 'express';
import { startOfHour, parseISO } from 'date-fns';

import AppointmentsRepository from '../repositories/AppointmentsRepository';

const appointmentsRouter = Router();
const appointmentsRepository = new AppointmentsRepository();

appointmentsRouter.get('/', (request, response) => {
  const appointments = appointmentsRepository.all();

  return response.json(appointments);
});

appointmentsRouter.post('/', (request, response) => {
  const { provider, date } = request.body;

  // Chamada a Função passando como a data deve ser formatada.
  const parseDate = startOfHour(parseISO(date));

  // Verifica se já existe um agendamento no mesmo horario, se existir retorna =  true
  const findAppointmentInSameDate = appointmentsRepository.findByDate(
    parseDate,
  );

  /**  Se ja existir um agendamento no mesmo horario envia mensagem de erro avisando
   * que o horario já foi preenchido.
   */
  if (findAppointmentInSameDate) {
    return response
      .status(400)
      .json({ message: 'This appointment is already booked' });
  }

  const appointment = appointmentsRepository.create({
    provider,
    date: parseDate,
  });

  return response.json(appointment);
});

export default appointmentsRouter;
