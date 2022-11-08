import {IVideo} from '../../../types/video.interface'

export interface IVideoItem {
    item: IVideo;
    removeHandler?: (videoId:number) => void;
    isUpdateLink?:boolean;
    isSmall?: boolean
} 

export interface IManipulation extends Pick<IVideoItem,'removeHandler' | 'isUpdateLink'> {}


export interface IDuration {
    duration: number;
    position?: 'top-r' | 'top-l' | 'bot-r' | 'bot-l';
}

export interface IVideoStats {
    isSmall?: boolean;
    views: number;
    createdAt: string;
}