import { Injectable, NotFoundException, HttpException, HttpStatus } from '@nestjs/common';
import { Post } from '@prisma/client';
import { PostCreateDto } from 'src/dtos/post-create.dto';
import { UserRepository } from 'src/user/user.repository';
import { UserService } from 'src/user/user.service';
import { PostRepository } from './post.repository';

@Injectable()
export class PostService {
    constructor(private readonly postRep : PostRepository, private userRep : UserRepository){}

    async createPost(post : Readonly<PostCreateDto>): Promise<Post>{
        try{
            const user = await this.userRep.getUser({id : post.authorId});
            if (user){
                return await this.postRep.createPost(post);
            }
            else {
                throw new HttpException("User not found", HttpStatus.NOT_FOUND);
            }
        }catch (err){
            if (err instanceof HttpException){
                throw err
            }
            throw new HttpException("Internal Server Error", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async getPostsByUser(userId : number): Promise<Post[]>{
        try{
            const user = await this.userRep.getUser({id : userId});
            if (user){
                const posts = await this.postRep.getposts({where : {authorId : userId}}, false);
                return posts;
            }
            else {
                throw new HttpException("User not found", HttpStatus.NOT_FOUND);
            }
        }catch (err){
            if (err instanceof HttpException){
                throw err
            }
            throw new HttpException("Internal Server Error", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async getPostByPostId(postId: number): Promise<Post>{
        try{
            const post = await this.postRep.getPost({where : {id : postId}}, true);
            if (!post){
                throw new HttpException("Post not found", HttpStatus.NOT_FOUND);
            }
            return post
        }catch (err){
            if (err instanceof HttpException){
                throw err
            }
            throw new HttpException("Internal Server Error", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
