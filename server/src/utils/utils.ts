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


export const validEmail = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
export const validPassword = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
