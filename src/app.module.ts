import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './user/user.module';
import { PostController } from './post/post.controller';
import { PostModule } from './post/post.module';

@Module({
  imports: [PrismaModule, UserModule, ConfigModule.forRoot({isGlobal : true}), PostModule],
  controllers: [AppController, PostController],
  providers: [AppService],
})
export class AppModule {}
