import { RequestHandler } from 'express';
import { validate } from 'class-validator';
import { AuthDto, RegisterDto } from '../auth/auth.dto';
import { UserEditDto } from '../entities/user/user.dto';
import { formErrorMessage } from '../utils/utils';

export const userRegisterValidation: RequestHandler = async (req, res, next) => {

    const user = new RegisterDto();
    user.avatarPath = req.body.avatarPath;
    user.description = req.body.description;
    user.email = req.body.email;
    user.name = req.body.name;
    user.password = req.body.password;

    const errors = await validate(user);

    if (errors.length) {
        return res.status(500).send({message: formErrorMessage(errors)});

    }
    next()
}

export const userAuthValidation: RequestHandler = async (req, res, next) => {

    const user = new AuthDto();
    user.password = req.body.password;
    user.email = req.body.email;


    const errors = await validate(user);

    if (errors.length) {        
        return res.status(500).send({message: formErrorMessage(errors)});
    }
    next()
}

export const userEditValidation: RequestHandler = async (req, res, next) => {

    const user = new UserEditDto();
    user.description = req.body.data.description;
    user.avatarPath = req.body.data.avatarPath;
    user.name = req.body.data.name;

    const errors = await validate(user);

    if (errors.length) {
        return res.status(500).send({message: formErrorMessage(errors)});

    }
    next()
}
