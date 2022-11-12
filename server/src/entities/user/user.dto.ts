import { IsNumber, IsString } from "class-validator";



export class UserEditDto {
    @IsString()
    name!: string;
    
    @IsString()
    description!: string;

    @IsString()
    avatarPath!: string;
    @IsNumber()
    id!: number;
}