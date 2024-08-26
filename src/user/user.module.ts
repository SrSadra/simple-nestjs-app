import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { UserController } from './user.controller';
import { UserRepository } from './user.repository';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Module({
  imports : [
    PrismaModule, 
    JwtModule.registerAsync({
      useFactory: (configService: ConfigService) => ({
        global : true,
        secret: configService.get('JWT_SECRET'),
        signOptions: { expiresIn: '3600s' },
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [UserService, UserRepository],
  controllers: [UserController],
  exports : [UserRepository]
})
export class UserModule {}
