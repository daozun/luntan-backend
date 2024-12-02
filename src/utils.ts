import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

const saltOrRounds = 10;

export const hashPassword = async (password: string) => {
  return await bcrypt.hash(password, saltOrRounds);
};

export const comparePassword = async (password: string, hash: string) => {
  return await bcrypt.compare(password, hash);
};

export const generateToken = async (data: { id: number, name: String}) => {
  const jwtService = new JwtService();

  const payload = { sub: data.id, username: data.name };

  const access_token = await jwtService.signAsync(payload);

  return access_token;
};
