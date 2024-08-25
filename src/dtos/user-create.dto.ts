import { IsString } from "class-validator";
import { UserLoginDto } from "./user-login.dto";

export class UserCreateDto extends UserLoginDto {
    @IsString()
    firstname? : string;

    @IsString()
    lastname : string;

    
}