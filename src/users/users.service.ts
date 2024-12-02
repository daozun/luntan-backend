import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from '../prisma.service';
import { AuthService } from "@/auth/auth.service"
import { User, Prisma } from '@prisma/client';
import { R } from '@/result';
import { hashPassword, comparePassword, generateToken } from '@/utils';
import { omit } from 'lodash';

@Injectable()
export class UsersService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
    private authService: AuthService,
  ) {}
  async create(data: Prisma.UserCreateInput): Promise<R> {
    const user = await this.searchUser(data);

    if (user) {
      return R.fail('用户已存在');
    }

    const newPassword = await hashPassword(data.password);

    const res = await this.prisma.user.create({
      data: {
        ...data,
        password: newPassword,
      },
    });

    if (res.id) {
      const user = await this.findOneById(res.id);

      const access_token = await this.authService.generateToken(user.data);

      return R.ok('注册成功', {
        id: res.id,
        token: access_token,
      });
    }

    return R.fail('注册失败');
  }

  async login(data: Prisma.UserCreateInput): Promise<R> {
    const user = await this.searchUser(data);

    if (!user) {
      return R.fail('用户不存在');
    }

    const isMatch = await comparePassword(data.password, user.password);

    if (!isMatch) {
      return R.fail('密码错误');
    }

    const access_token = await this.authService.generateToken(user);

    return R.ok('登录成功', {
      id: user.id,
      token: access_token,
    });
  }

  async searchUser(data: Prisma.UserCreateInput) {
    const user = await this.prisma.user.findFirst({
      where: {
        name: data.name,
      },
    });

    return user;
  }

  findAll() {
    return `This action returns all users`;
  }

  async findOneById(id: number) {
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
