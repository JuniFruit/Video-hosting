import { ValidationError } from 'class-validator';
import { RequestHandler } from 'express';
import { AuthDto, RegisterDto } from '../auth/auth.dto';
import { UserEditDto } from '../entities/user/user.dto';
import { formErrorMessage } from '../utils/utils';
import { validationPipe } from './validationPipe';

export const userRegisterValidation: RequestHandler = async (req, res, next) => {

    const result = await validationPipe(RegisterDto, { ...req.body })

    if ((result as ValidationError[]).length) {
        return res.status(500).send({ message: formErrorMessage(result as ValidationError[]) });

    }
    next()
}

export const userAuthValidation: RequestHandler = async (req, res, next) => {



    const result = await validationPipe(AuthDto, { ...req.body })

    if ((result as ValidationError[]).length) {
        return res.status(500).send({ message: formErrorMessage(result as ValidationError[]) });

    }
    next()
}

export const userEditValidation: RequestHandler = async (req, res, next) => {

    const result = await validationPipe(UserEditDto, { ...req.body.data })

    if ((result as ValidationError[]).length) {
        return res.status(500).send({ message: formErrorMessage(result as ValidationError[]) });

    }
    next()
}
