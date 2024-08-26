import { IsOptional, IsString } from "class-validator";
import { UserLoginDto } from "./user-login.dto";

export class UserCreateDto extends UserLoginDto {
    @IsString()
    @IsOptional()
    firstname? : string;

    @IsString()
    @IsOptional()
    lastname? : string;

    
}