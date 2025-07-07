import { User } from '../entities/User';

export interface UserRepository {
  create(user: User): Promise<void>;
  getById(id: string): Promise<User | null>;
  getAll(): Promise<User[]>;
  update(user: User): Promise<void>;
  delete(id: string): Promise<void>;
}
