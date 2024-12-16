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

export class CreatePostDto {
  @IsNotEmpty({
    message: '标题不能为空',
  })
  title: string;

  @IsNotEmpty({
    message: '内容不能为空',
  })
  content: string;

  @IsNotEmpty({
    message: 'userId不能为空',
  })
  userId: number;
}
