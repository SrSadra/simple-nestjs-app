import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { UserRepository } from "src/user/user.repository";

@Injectable()
export class jwtStrategy extends PassportStrategy(Strategy , "jwt") {
    constructor(private readonly configSer : ConfigService, private readonly userRep : UserRepository){
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken() || ExtractJwt.fromExtractors([
                (request: any) => {
                  return request?.Authentication;
                },
              ]),
            ignoreExpiration: false,
            secretOrKey: configSer.get('JWT_SECRET'),
        })
    }

    async validate(payload : any){
      const user = await this.userRep.getUser({id : payload.id});
      delete user?.password;
      return user; // attachs user to req
    }
}