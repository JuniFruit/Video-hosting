import { ValidationError } from 'class-validator';
import { RequestHandler } from 'express';
import { CommentDto } from '../entities/comments/comment.dto';
import { formErrorMessage } from '../utils/utils';
import { validationPipe } from './validationPipe';

const commentValidation: RequestHandler = async (req, res, next) => {

    const result = await validationPipe(CommentDto, { ...req.body.dto })

    if ((result as ValidationError[]).length) {
        return res.status(500).send({ message: formErrorMessage(result as ValidationError[]) });

    }
    next()
}

export default commentValidation;