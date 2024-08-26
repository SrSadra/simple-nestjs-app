import { Module } from '@nestjs/common';
import { authGuard } from 'src/guards/auth.guard';
import { jwtStrategy } from 'src/guards/jwt.guard';
import { PrismaModule } from 'src/prisma/prisma.module';
import { UserModule } from 'src/user/user.module';
import { PostController } from './post.controller';
import { PostRepository } from './post.repository';
import { PostService } from './post.service';

@Module({
  imports : [UserModule, PrismaModule],
  controllers : [PostController],
  providers: [PostService, PostRepository,authGuard, jwtStrategy]
})
export class PostModule {}
