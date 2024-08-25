import { User, Prisma, Post } from "@prisma/client";
import { PostCreateDto } from "src/dtos/post-create.dto";
import { PrismaService } from "src/prisma/prisma.service";


export class PostRepository {
    constructor(private prisma : PrismaService){}

    async createPost(params: PostCreateDto ): Promise<Post> {
        const {title, description , authorId} = params;
        return await this.prisma.post.create({
            data: {
                title,
                description,
                author : {
                    connect : {id : authorId}
                }
            },
          });
      }
    
      async getposts(params: {
        skip?: number;
        take?: number;
        cursor?: Prisma.PostWhereUniqueInput;
        where?: Prisma.PostWhereInput;
        orderBy?: Prisma.PostOrderByWithRelationInput;
      }, isIncluded: boolean): Promise<Post[]> {
        const { skip, take, cursor, where, orderBy } = params;
        return await this.prisma.post.findMany({ skip, take, cursor, where, orderBy, include : {author : isIncluded} });
      }

      async getPost(params: {
        where : Prisma.PostWhereInput
      }, isIncluded : boolean){
        const {where} = params;
        return await this.prisma.post.findFirst({where , include : {author : isIncluded}});
      }
    
    
      async deletePost(params: {
        where: Prisma.PostWhereUniqueInput;
      }): Promise<Post> {
        const { where } = params;
        return await this.prisma.post.delete({ where });
      }
    
}