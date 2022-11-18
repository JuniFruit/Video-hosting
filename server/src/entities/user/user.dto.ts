import { IsNumber, IsString, ValidateIf } from "class-validator";



export class UserEditDto {
    @IsString()
    name!: string;
    
    @ValidateIf((o) => o.description !== undefined)
    @IsString()
    description?: string;
    
    @ValidateIf((o) => o.avatarPath !== undefined)
    @IsString()
    avatarPath?: string;    
}