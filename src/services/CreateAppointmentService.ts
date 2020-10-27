import { startOfHour } from 'date-fns';
import { getCustomRepository } from 'typeorm';

import Appointment from '../models/Appointment';
import AppointmentsRepository from '../repositories/AppointmentsRepository';

interface Request {
  provider: string;
  date: Date;
}
/**
 * Dependency Inversion
 */

class CreateAppointmentService {
  public async execute({ provider, date }: Request): Promise<Appointment> {
    const appointmentsRepository = getCustomRepository(AppointmentsRepository);

    const appointmentDate = startOfHour(date);

    // Verifica se já existe um agendamento no mesmo horario, se existir retorna =  true
    const findAppointmentInSameDate = await appointmentsRepository.findByDate(
      appointmentDate,
    );

    /**  Se ja existir um agendamento no mesmo horario envia mensagem de erro avisando
     * que o horario já foi preenchido.
     */
    if (findAppointmentInSameDate) {
      throw Error('This appointment is already booked');
    }

    const appointment = appointmentsRepository.create({
      provider,
      date: appointmentDate,
    });

    await appointmentsRepository.save(appointment);

    return appointment;
  }
}

export default CreateAppointmentService;
