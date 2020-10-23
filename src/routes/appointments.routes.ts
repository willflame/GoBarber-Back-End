import { Router } from 'express';
import { startOfHour, parseISO, isEqual } from 'date-fns';

import Appointment from '../models/Appointment';

const appointmentsRouter = Router();

const appointments: Appointment[] = [];

appointmentsRouter.post('/', (request, response) => {
  const { provider, date } = request.body;

  // Chamada a Função passando como a data deve ser formatada.
  const parseDate = startOfHour(parseISO(date));

  // Verifica se já existe um agendamento no mesmo horario, se existir retorna =  true
  const findAppointmentInSameDate = appointments.find(appointment =>
    isEqual(parseDate, appointment.date),
  );

  /**  Se ja existir um agendamento no mesmo horario envia mensagem de erro avisando
   * que o horario já foi preenchido.
   */
  if (findAppointmentInSameDate) {
    return response
      .status(400)
      .json({ message: 'This appointment is already booked' });
  }

  const appointment = new Appointment(provider, parseDate);

  appointments.push(appointment);

  return response.json(appointment);
});

export default appointmentsRouter;
