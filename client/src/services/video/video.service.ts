import { IVideo } from "../../types/video.interface";
import { axiosRequest } from "../../api/axios";

export const VIDEO_PATH = 'videos';

export const VideoService = {   
    getAll: async function () {
        const response = axiosRequest.get<IVideo[]>(`/${VIDEO_PATH}/all`);
        return response;
        
    },

    getMostViewed: async function () {
        const response = axiosRequest.get<IVideo[]>(`/${VIDEO_PATH}/most_viewed`);
        return response;
        
    }
    

}