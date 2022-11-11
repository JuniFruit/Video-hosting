export const setTabTitle = (title: string) => {
    return document.title = title;
}

export const validEmail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;


export const randomize = (max:number):number => {
    return Math.floor(Math.random() * max);
}
