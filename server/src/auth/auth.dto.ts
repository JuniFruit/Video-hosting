import { isEmail, IsEmail, isString, IsString, isValidationOptions, MaxLength, MinLength, ValidateIf } from "class-validator";

export class AuthDto {
    @IsEmail()
    email!: string

    @MinLength(6, {
        message: 'Password must contain at least 6 characters'
    })
    
    @IsString()
    password!: string
}

export class RegisterDto {
    @IsEmail()
    email!: string

    @MinLength(6, {
        message: 'Password must contain at least 6 characters'
    })
    @IsString()
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