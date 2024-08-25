import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { UserLoginDto } from 'src/dtos/user-login.dto';
import { UserRepository } from './user.repository';
import * as bcrypt from "bcrypt"
import { UserCreateDto } from 'src/dtos/user-create.dto';
import { ConfigService } from '@nestjs/config';
import { User } from '@prisma/client';

@Injectable()
export class UserService {
    constructor(private userRep : UserRepository, private configSer : ConfigService){}

    async login(user : Readonly<UserLoginDto>){
        try{
            const {email, password } = user;
            const foundedUser = await this.userRep.getUser({email});
            if (!foundedUser){
              throw new HttpException('Incorrect email/password', HttpStatus.UNAUTHORIZED);
            }
            const validate = this.validatePassword(password,foundedUser.password);
            if (!validate){
              throw new HttpException('Incorrect email/password', HttpStatus.UNAUTHORIZED);
            }
        
            delete foundedUser.password; // for more security
            return foundedUser;
          }catch{
            throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
          }
    }

    async register(createUser : Readonly<UserCreateDto>){ // with readonly you can just get the attrbute and not changing them. it improves safety
        try{
          const {email , password } = createUser;
          const user = await this.userRep.getUser({email});
          if (user){
            const hashed = await this.hashPassword(password);
            const user = await this.userRep.createUser({
              ...createUser,
              password : hashed
            });
    
            delete user.password;
            return user;
          }
          else {
            throw new HttpException('Email is already in use', HttpStatus.CONFLICT);
          }
        }catch{
          throw new HttpException('Email is already in use', HttpStatus.CONFLICT);
        }
      }

    private async validatePassword(pass : string, hashed : string){
        return await bcrypt.compare(pass, hashed);
    }

    async findUserByEmail(email: string): Promise<User>{
        return await this.userRep.getUser({email});
    }

    async findUserById(id: number): Promise<User>{
        return await this.userRep.getUser({id});
    }

    private async hashPassword(password: string): Promise<string> {
        const salt = this.configSer.get("BCRYPT_SALT")
        return await bcrypt.hash(password, salt);
      }
}
