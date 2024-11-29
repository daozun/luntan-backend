import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class TimezoneInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((data) => {
        if (Array.isArray(data)) {
          return data.map(this.convertDatesToLocalTime);
        }
        return this.convertDatesToLocalTime(data);
      }),
    );
  }

  private convertDatesToLocalTime(data: any): any {
    if (data && typeof data === 'object') {
      for (const key in data) {
        if (data[key] instanceof Date) {
          data[key] = new Date(data[key]).toLocaleString('zh-CN', {
            timeZone: 'Asia/Shanghai',
          });
        } else if (typeof data[key] === 'object') {
          this.convertDatesToLocalTime(data[key]);
        }
      }
    }
    return data;
  }
}
