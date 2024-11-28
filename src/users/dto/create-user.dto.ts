import {
  validate,
  validateOrReject,
  Contains,
  IsInt,
  Length,
  IsEmail,
  IsFQDN,
  IsDate,
  Min,
  Max,
  IsNotEmpty,
} from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty({
    message: '用户名不能为空',
  })
  name: string;

  @IsNotEmpty({
    message: '密码不能为空',
  })
  password: string;
}
