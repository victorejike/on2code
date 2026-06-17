import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
  private users = [
    { id: 'user-1', email: 'student@on2code.com', name: 'Demo Student' }
  ];

  findByEmail(email: string) {
    return this.users.find((user) => user.email === email);
  }

  findById(id: string) {
    return this.users.find((user) => user.id === id);
  }
}
