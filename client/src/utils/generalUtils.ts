export const setTabTitle = (title: string) => {
    return document.title = title;
}

export const validEmail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
export const validPassword = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;

export const randomize = (min: number, max:number):number => {
    return Math.floor((Math.random() + min) * max);
}
