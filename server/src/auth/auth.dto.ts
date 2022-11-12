import { isEmail, IsEmail, isString, IsString, isValidationOptions, MaxLength, MinLength } from "class-validator";

export class AuthDto {
    @IsEmail()
    email!: string

    @MinLength(6, {
        message: 'Password must contain at least 6 symbols'
    })
    
    @IsString()
    password!: string
}

export class RegisterDto {
    @IsEmail()
    email!: string

    @MinLength(6, {
        message: 'Password must contain at least 6 symbols'
    })
    @IsString()
    password!: string

    @MaxLength(200,{
        message: 'Description is too big'
    })
    
    @IsString()
    description!: string

    @IsString()
    avatarPath!: string

    @IsString()
    name!: string
}