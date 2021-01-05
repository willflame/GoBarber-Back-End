import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';
import CreateAppointmentService from './CreateAppointmentService';

describe('CreateAppointiment', () => {
  it('should be able to create a new appointment', async () => {
    const fakeAppointmentsRepository = new FakeAppointmentsRepository();
    const createAppointment = new CreateAppointmentService(
      fakeAppointmentsRepository,
    );

    const appointment = await createAppointment.execute({
      date: new Date(),
      provider_id: '147258',
    });

    expect(appointment).toHaveProperty('id');
    expect(appointment.provider_id).toBe('147258');
  });

  // it('should not be able to create two appointment on the same time', () => {
  //   expect(1 + 1).toBe(2);
  // });
});