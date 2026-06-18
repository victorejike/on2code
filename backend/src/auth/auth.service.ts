import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService, private usersService: UsersService) {}

  async validateUser(email: string, password: string) {
    const user = await this.usersService.findByEmail(email);
    if (!user) {
      return null;
    }
    const isValid = await this.usersService.checkPassword(user, password);
    if (!isValid) {
      return null;
    }
    return { id: user.id, email: user.email, name: user.name };
  }

  async login(user: { id: string; email: string; name?: string }) {
    const payload = { sub: user.id, email: user.email };
    return {
      accessToken: this.jwtService.sign(payload),
      user: {
        id: user.id,
        email: user.email,
        name: user.name
      }
    };
  }

  async register(name: string, email: string, password: string) {
    const user = await this.usersService.createUser(name, email, password);
    if (!user) {
      return null;
    }
    return this.login({ id: user.id, email: user.email, name: user.name });
  }
}
