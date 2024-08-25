import { IsNotEmpty, IsOptional, IsString } from "class-validator";


export class PostCreateDto {
    @IsString()
    @IsNotEmpty()
    title: string;

    @IsNotEmpty()
    description: string;

    @IsNotEmpty()
    authorId: number;

    @IsOptional()
    createdAt : Date;
}