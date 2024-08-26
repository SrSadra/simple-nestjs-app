import { Injectable } from "@nestjs/common";
import { User, Prisma } from "@prisma/client";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class UserRepository {
    constructor(private prisma : PrismaService){}

    async createUser(params: Prisma.UserCreateInput ): Promise<User> {
        return await this.prisma.user.create({data: params });
      }
    
      async getUsers(params: {
        skip?: number;
        take?: number;
        cursor?: Prisma.UserWhereUniqueInput;
        where?: Prisma.UserWhereInput;
        orderBy?: Prisma.UserOrderByWithRelationInput;
      }): Promise<User[]> {
        const { skip, take, cursor, where, orderBy } = params;
        return await this.prisma.user.findMany({ skip, take, cursor, where, orderBy });
      }

      async getUser(params: Prisma.UserWhereInput): Promise<User>{
        const user = await this.prisma.user.findFirst({where : params});
        // delete user?.password;
        return user;
      }
    
      async updateUser(params: {
        where: Prisma.UserWhereUniqueInput;
        data: Prisma.UserUpdateInput;
      }): Promise<User> {
        const { where, data } = params;
        return await this.prisma.user.update({ where, data });
      }
    
      async deleteUser(params: {
        where: Prisma.UserWhereUniqueInput;
      }): Promise<User> {
        const { where } = params;
        return await this.prisma.user.delete({ where });
      }
    
}