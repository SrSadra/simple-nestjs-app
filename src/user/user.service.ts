import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { UserLoginDto } from 'src/dtos/user-login.dto';
import { UserRepository } from './user.repository';
import * as bcrypt from "bcrypt"
import { UserCreateDto } from 'src/dtos/user-create.dto';
import { ConfigService } from '@nestjs/config';
import { User } from '@prisma/client';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
    constructor(private userRep : UserRepository, private configSer : ConfigService,private jwtSer : JwtService){}

    async login(user : Readonly<UserLoginDto>){
        try{
          
            const {email, password } = user;
            const foundedUser = await this.userRep.getUser({email});
            if (!foundedUser){
              throw new HttpException('Incorrect email/password', HttpStatus.UNAUTHORIZED);
            }
            const validate = await this.validatePassword(password,foundedUser.password);
            if (!validate){
              throw new HttpException('Incorrect email/password', HttpStatus.UNAUTHORIZED);
            }
        
            delete foundedUser.password; // for more security

            const token = await this.jwtSer.signAsync({user : foundedUser});
            console.log(token);
            return token;
            // return foundedUser;
          }catch (err){
            if (err instanceof HttpException){
              throw err;
            }
            throw err;
          }
    }

    async register(createUser : Readonly<UserCreateDto>){ // with readonly you can just get the attrbute and not changing them. it improves safety
        try{
          const {email , password } = createUser;
          const user = await this.userRep.getUser({email});
          if (!user){
            const hashed = await this.hashPassword(password);
            console.log(hashed);
            const user = await this.userRep.createUser({
              ...createUser,
              password : hashed
            });
            console.log(user);
    
            delete user.password;

            return user;
          }
          else {
            throw new HttpException('Email is already in use', HttpStatus.CONFLICT);
          }
        }catch (err){
          if (err instanceof HttpException){
            throw err;
          }
          throw new HttpException('Internal Server Error' , HttpStatus.INTERNAL_SERVER_ERROR);
        }
      }

    private async validatePassword(pass : string, hashed : string){
        return await bcrypt.compare(pass, hashed);
    }

    async findUserByEmail(email: string): Promise<User>{
        return await this.userRep.getUser({email});
    }

    async findUserById(id: number): Promise<User>{
      try {
        const user =  await this.userRep.getUser({id});
        if (!user){
          throw new HttpException('User doesnt exist', HttpStatus.NOT_FOUND);
        }
        else{
          delete user.password;
          return user;
        }
      }catch (err){
        if (err instanceof HttpException){
          throw err;
        }
        throw new HttpException('Internal Server Error' , HttpStatus.INTERNAL_SERVER_ERROR);
      }
    }

    private async hashPassword(password: string): Promise<string> {
        const salt = Number(this.configSer.get("BCRYPT_SALT"));
        console.log(salt);
        const tmp = await bcrypt.hash(password, salt);
        console.log(tmp);
        return tmp;
      }
}
