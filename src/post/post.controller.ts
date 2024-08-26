import { Body, Controller, Get, Param, ParseIntPipe, Post, UseGuards } from '@nestjs/common';
import { PostCreateDto } from 'src/dtos/post-create.dto';
import { authGuard } from 'src/guards/auth.guard';
import { PostService } from './post.service';

@Controller('post')
export class PostController {
    constructor(private readonly postSer : PostService){}

    @Post("create")
    async createPost(@Body() dto : PostCreateDto){
        return await this.postSer.createPost(dto);
    }

    @UseGuards(authGuard) // uncomment token from user login section to work properly
    @Get("userposts/:id")
    async getUserPosts(@Param("id", ParseIntPipe) userId : number){
        return await this.postSer.getPostsByUser(userId);
    }   

    @UseGuards(authGuard) // uncomment token from user login section to work properly
    @Get("posts/:id")
    async getPost(@Param("id", ParseIntPipe) postId : number){
        return await this.postSer.getPostByPostId(postId);
    }
}


