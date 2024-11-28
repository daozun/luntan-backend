import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from '../prisma.service';
import { User, Prisma } from '@prisma/client';
import { R } from '@/result';
import { hashPassword } from '@/utils';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}
  async create(data: Prisma.UserCreateInput): Promise<R> {
    const newPassword = await hashPassword(data.password);

    const res = await this.prisma.user.create({
      data: {
        ...data,
        password: newPassword,
      },
    });

    if (res.id) {
      return R.ok('创建成功');
    }

    return R.fail('创建失败');
  }

  login(createUserDto: CreateUserDto) {
    throw new Error('Method not implemented.');
  }  

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
