import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeUserTokensRepository from '../repositories/fakes/FakeUserTokensRepository';
import ResetPasswordService from './ResetPasswordService';

let fakeUsersRepository: FakeUsersRepository;
let fakeUserTokensRepository: FakeUserTokensRepository;
let resetPassword: ResetPasswordService;

describe('ResetPassword', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeUserTokensRepository = new FakeUserTokensRepository();

    resetPassword = new ResetPasswordService(
      fakeUsersRepository,
      fakeUserTokensRepository,
    );
  });

  it('should be able to reset the password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '142536',
    });

    const { token } = await fakeUserTokensRepository.generate(user.id);

    await resetPassword.execute({
      password: '142536',
      token,
    });

    const updateUser = await fakeUsersRepository.findById(user.id);

    expect(updateUser?.password).toBe('142536');
  });

  // it('should not be able to recover a not-existing user password', async () => {
  //   await expect(
  //     sendForgotPasswordEmail.execute({
  //       email: 'johndoe@example.com',
  //     }),
  //   ).rejects.toBeInstanceOf(AppError);
  // });

  // it('should generate a forgot password token', async () => {
  //   const generateToken = jest.spyOn(fakeUserTokensRepository, 'generate');

  //   const user = await fakeUsersRepository.create({
  //     name: 'John Doe',
  //     email: 'johndoe@example.com',
  //     password: '142536',
  //   });

  //   await sendForgotPasswordEmail.execute({
  //     email: 'johndoe@example.com',
  //   });

  //   expect(generateToken).toHaveBeenCalledWith(user.id);
  // });
});
