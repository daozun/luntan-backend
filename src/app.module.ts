import { Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { PrismaService } from './prisma.service';
import { constant } from '@/common/constant';
import { TimezoneInterceptor } from '@/common/interceptor/TimezoneInterceptor';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: constant.jwtSecret,
      signOptions: { expiresIn: '1d' },
    }),
    UsersModule,
  ],
  controllers: [AppController],
  providers: [
    // {
    //   provide: APP_INTERCEPTOR,
    //   useClass: TimezoneInterceptor,
    // },
    AppService,
    PrismaService,
  ],
})
export class AppModule {}
