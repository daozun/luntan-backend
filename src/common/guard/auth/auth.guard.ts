import {
  Injectable,
  CanActivate,
  HttpException,
  HttpStatus,
  ExecutionContext,
} from '@nestjs/common';
import { JwtService, TokenExpiredError } from '@nestjs/jwt';
import { constant } from '@/common/constant';

@Injectable()
export class AuthGuard implements CanActivate {
  // 全局守卫
  async canActivate(context: ExecutionContext): Promise<boolean> {
    // context 请求的（Response/Request)的引用
    // 获取请求头部数据
    const request = context.switchToHttp().getRequest();

    // 获取请求头中的 authorization 字段
    let token = context.switchToRpc().getData().headers.authorization;
    token = this.extractTokenFromHeader(token);

    // 验证token的合理性以及根据token做响应的操作
    if (token) {
      try {
        // 校验 token
        const jwtService = new JwtService();
        const res = jwtService.verify(token, { secret: constant.jwtSecret });

        // 传递用户信息到 controller
        request['user'] = res;

        return res;
      } catch (e) {
        if(e instanceof TokenExpiredError) {
          throw new HttpException(
            'token 已过期，请重新登陆',
            HttpStatus.UNAUTHORIZED,
          );
        }

        throw new HttpException(
          '没有授权访问，请先登陆',
          HttpStatus.UNAUTHORIZED,
        );
      }
    } else {
      // 白名单验证
      if (this.hasUrl(this.urlList, request.url)) {
        return true;
      }
      throw new HttpException(
        '没有授权访问，请先登陆',
        HttpStatus.UNAUTHORIZED,
      );
    }
  }

  // 白名单
  private urlList: string[] = ['/users/login', '/users/register'];

  // 验证请求是否为白名单的路由
  private hasUrl(urlList: string[], url: string): boolean {
    let flag: boolean = false;
    if (urlList.indexOf(url.split('?')[0]) >= 0) {
      flag = true;
    }
    return flag;
  }

  private extractTokenFromHeader(authorization: string): string | undefined {
    const [type, token] = authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
