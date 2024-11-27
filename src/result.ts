import { ApiProperty } from '@nestjs/swagger';

export const SUCCESS_CODE = 10000;

export class R {
  constructor(code = SUCCESS_CODE, message?: string, data?: any) {
    this.code = code;
    this.message = message;
    this.data = data || null;
  }

  @ApiProperty({ type: 'number', default: SUCCESS_CODE })
  code: number;

  @ApiProperty({ type: 'string', default: 'ok' })
  message?: string;

  data?: any;

  static ok(message?: string, data?: any): R {
    return new R(SUCCESS_CODE, message, data);
  }

  static fail(message?: string, data?: any, code: number = 20000) {
    return new R(code, message, data);
  }
}
