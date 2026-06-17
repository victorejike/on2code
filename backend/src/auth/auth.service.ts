import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  async validateUser(email: string, password: string) {
    // TODO: replace with database lookup
    if (email === 'student@on2code.com' && password === 'password') {
      return { id: 'user-1', email };
    }
    return null;
  }

  async login(user: { id: string; email: string }) {
    const payload = { sub: user.id, email: user.email };
    return {
      accessToken: this.jwtService.sign(payload)
    };
  }
}
