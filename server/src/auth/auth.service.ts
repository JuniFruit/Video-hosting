
import {userRepository} from '../database/db';
import { UserEntity } from '../entities/user/user.entity';
import { AuthDto, RegisterDto } from './auth.dto';
import { genSalt, hash, compare } from 'bcrypt';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

dotenv.config()

export const AuthService = {

    userTable: userRepository,

    login: async function(dto: AuthDto) {
        const user = await this.validateUser(dto);

        return user;
    },

    registerUser: async function(dto: RegisterDto): Promise<object> {
        const oldUser = await this.userTable.findOneBy({ email: dto.email });

        if (oldUser) throw new Error('Email is already in use');

        const salt = await genSalt(10);
        const hashedPass = await hash(dto.password, salt);

        const newUser = new UserEntity()

        newUser.email = dto.email;
        newUser.password = hashedPass;
        newUser.description = dto.description;
        newUser.avatarPath = dto.avatarPath;
        newUser.name = dto.name || 'default_user';

        await this.userTable.save(newUser);

        return {
            user: this.returnUserMainFields(newUser)
        }
    },

    validateUser: async function(dto: AuthDto): Promise<object> {
        const user = await this.userTable.findOne({
            where: {
                email: dto.email
            },
            select: ['id', 'email', 'password']

        })

        if (!user) throw new Error('User is not found')

        const matchedPassword = await compare(dto.password, user.password);
        if (!matchedPassword) throw new Error('Incorrect password');

        return {
            user: this.returnUserMainFields(user)
        }
    },

    returnUserMainFields: function(user: UserEntity) {
        const accessToken = this.generateToken(user);

        return {
            id: user.id,
            email: user.email,
            accessToken
        }
    },

    generateToken: function (user: UserEntity) {
        const accessToken = jwt.sign(
            {id: user.id, email: user.email},
            process.env.JWT_SECRET!,
            {
                expiresIn: '24h'
            }
        )

        return accessToken;
    }   


}


