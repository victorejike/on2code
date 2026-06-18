import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

interface UserRecord {
  id: string;
  email: string;
  name: string;
  passwordHash: string;
}

@Injectable()
export class UsersService {
  private users: UserRecord[] = [
    {
      id: 'user-1',
      email: 'student@on2code.com',
      name: 'Demo Student',
      passwordHash: bcrypt.hashSync('password', 10)
    }
  ];

  async findByEmail(email: string) {
    return this.users.find((user) => user.email === email);
  }

  findById(id: string) {
    return this.users.find((user) => user.id === id);
  }

  async createUser(name: string, email: string, password: string) {
    if (this.users.some((user) => user.email === email)) {
      return null;
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user: UserRecord = {
      id: `user-${Date.now()}`,
      email,
      name,
      passwordHash: hashedPassword
    };

    this.users.push(user);
    return user;
  }

  async checkPassword(user: UserRecord, password: string) {
    return bcrypt.compare(password, user.passwordHash);
  }
}
