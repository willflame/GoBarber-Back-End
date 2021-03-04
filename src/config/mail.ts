interface IMailConfig {
  driver: 'ethereal' | 'ses';

  defaults: {
    from: {
      email: string,
      name: string,
    }
  }
}

export default {
  driver: process.env.MAIL_DRIVER || 'ethereal',

  defaults: {
    from: {
      email: 'teste@teste.com.br',
      name: 'Teste de email',
    }
  }
} as IMailConfig;
