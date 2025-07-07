import { CreateUser } from '../../src/application/CreateUser';
import { InMemoryUserRepository } from '../../src/infrastructure/db/InMemoryUserRepository';

describe('CreateUser', () => {
  it('should create a new user', async () => {
    const repo = new InMemoryUserRepository();
    const useCase = new CreateUser(repo);

    const user = await useCase.execute('Freddy', 'freddy@example.com');
    expect(user.name).toBe('Freddy');
    expect(user.email).toBe('freddy@example.com');
    expect(user.id).toBeDefined();
  });
});
