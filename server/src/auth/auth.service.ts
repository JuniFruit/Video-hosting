
import {userRepository} from '../database/db';
import { UserEntity } from '../entities/user/user.entity';
import { AuthDto } from './auth.dto';
import { genSalt, hash, compare } from 'bcrypt';
import { NextFunction, Request, Response } from 'express';


export const AuthService = {

    userTable: userRepository,

    login: async function(dto: AuthDto): Promise<object> {
        const user = await this.validateUser(dto);

        return {
            user: this.returnUserMainFields(user)
        }
    },

    registerUser: async function(dto: AuthDto): Promise<object> {
        const oldUser = await this.userTable.findOneBy({ email: dto.email });

        if (oldUser) throw new Error('Email is already in use');

        const salt = await genSalt(10);
        const hashedPass = await hash(dto.password, salt);

        const newUser = new UserEntity()

        newUser.email = dto.email;
        newUser.password = hashedPass

        await this.userTable.save(newUser);

        return {
            user: this.returnUserMainFields(newUser)
        }
    },

    validateUser: async function(dto: AuthDto): Promise<UserEntity> {
        const user = await this.userTable.findOne({
            where: {
                email: dto.email
            },
            select: ['id', 'email', 'password']

        })

        if (!user) throw new Error('User is not found')

        const matchedPassword = await compare(dto.password, user.password);
        console.log(matchedPassword)
        if (!matchedPassword) throw new Error('Incorrect password');

        return user
    },

    returnUserMainFields: function(user: UserEntity): object {
        return {
            id: user.id,
            email: user.email
        }
    }

}


export const isAuthorized = (req: Request,res: Response, next: NextFunction) => {
    
}