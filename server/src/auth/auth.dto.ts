import { IsEmail, IsString, Matches, MaxLength, MinLength, ValidateIf } from "class-validator";
import { validEmail, validPassword } from "../utils/utils";

export class AuthDto {
    @IsEmail(validEmail, {
        message: 'Please provide a valid email'
    })
    email!: string
   
    @IsString()    
    password!: string
}

export class RegisterDto {
    @IsEmail(validEmail,{
        message: 'Please provide a valid email'
    })
    email!: string

    @MinLength(6, {
        message: 'Password must contain at least 6 characters'
    })
    @IsString()
    @Matches(validPassword, {
        message: 'Must contain at least one number and one uppercase and lowercase letter, and at least 6 or more characters'
    })
    password!: string

    @ValidateIf(o => o.description !== undefined)
    @MaxLength(200,{
        message: 'Description is too big. Max is 200 characters'
    })
    @IsString()
    description!: string

    @ValidateIf(o => o.avatarPath !== undefined)
    @IsString()
    avatarPath!: string

    @IsString()
    name!: string
}