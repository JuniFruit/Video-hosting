import { ValidationError } from 'class-validator';
import { RequestHandler } from 'express';
import { VideoDto } from '../entities/video/video.dto';
import { formErrorMessage } from '../utils/utils';
import { validationPipe } from './validationPipe';

export const videoValidation: RequestHandler = async (req, res, next) => {

    const result = await validationPipe(VideoDto, { ...req.body.dto })

    if ((result as ValidationError[]).length) {
        return res.status(500).send({ message: formErrorMessage(result as ValidationError[]) });

    }
    next()
}