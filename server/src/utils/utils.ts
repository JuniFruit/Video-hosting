import { ValidationError } from "class-validator";

export const DEFALUT_MSG = {
    ERR_UNKNOWN_MSG: 'Something went wrong!'
}

// 1GB
export const  FILE_SIZE_LIMIT = 1024 * 1024 * 1024;


export const formErrorMessage = (errors: ValidationError[]) => {
        const message = errors.map(error => `${error.property} - ${Object.values(error.constraints!).join(', ')}`).join('; ');
        return message;
}
