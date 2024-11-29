import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from '../prisma.service';
import { User, Prisma } from '@prisma/client';
import { R } from '@/result';
import { hashPassword } from '@/utils';
import { omit } from 'lodash';

@Injectable()
export class UsersService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}
  async create(data: Prisma.UserCreateInput): Promise<R> {
    const newPassword = await hashPassword(data.password);

    const res = await this.prisma.user.create({
      data: {
        ...data,
        password: newPassword,
      },
    });

    if (res.id) {
      const user = await this.findOne(res.id);

      const { id, name } = user.data;

      const payload = { sub: id, username: name };

      const access_token = await this.jwtService.signAsync(payload);

      return R.ok('注册成功', {
        id: res.id,
        token: access_token,
      });
    }

    return R.fail('注册失败');
  }

  login(createUserDto: CreateUserDto) {
    throw new Error('Method not implemented.');
  }

  findAll() {
    return `This action returns all users`;
  }

  async findOne(id: number) {
    const user = await this.prisma.user.findUnique({
      where: {
        id,
      },
    });

    if (!user) {
      return R.fail('用户不存在');
    }

    let userInfo = omit(user, ['password']);

    return R.ok('获取成功', userInfo);
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
