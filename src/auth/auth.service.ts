import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  async generateToken(data: { id: number; name: string }): Promise<string> {
    const payload = { sub: data.id, username: data.name };
    const access_token = await this.jwtService.signAsync(payload);
    return access_token;
  }
}
