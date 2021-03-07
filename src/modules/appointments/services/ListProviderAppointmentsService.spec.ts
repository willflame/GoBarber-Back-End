import { createTrue } from 'typescript';
import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';
import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';
import ListProviderAppointmentsService from './ListProviderAppointmentsService';

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let fakeCacheProvider: FakeCacheProvider;
let ListProviderAppointment: ListProviderAppointmentsService;

describe('ListProviderAppointment', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();
    fakeCacheProvider = new FakeCacheProvider();

    ListProviderAppointment = new ListProviderAppointmentsService(
      fakeAppointmentsRepository,
      fakeCacheProvider,
    );
  });

  it('should be able to list the appointments an a specific day', async () => {
    const appointment1 = await fakeAppointmentsRepository.create({
      provider_id: 'provider-id',
      user_id: '15165',
      date: new Date(2021,4,20,8,0,0),
    });

    const appointment2 = await fakeAppointmentsRepository.create({
      provider_id: 'provider-id',
      user_id: '151151',
      date: new Date(2021,4,20,13,0,0),
    });

    const appointments = await ListProviderAppointment.execute({
      provider_id: 'provider-id',
      year: 2021,
      month: 5,
      day: 20,
    });

    expect(appointments).toEqual(expect.arrayContaining([appointment1,appointment2]));
  });
});
