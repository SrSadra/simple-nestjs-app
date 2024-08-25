import { Module } from '@nestjs/common';
import { UserModule } from 'src/user/user.module';
import { PostService } from './post.service';

@Module({
  imports : [UserModule],
  providers: [PostService]
})
export class PostModule {}
