
import { axiosRequest } from "../../api/axios";
import { IAuthData } from "./auth.interface";

export const AUTH_PATH = 'auth';

export const AuthService = {
    login: async function (email: string, password: string): Promise<IAuthData> {
  
        const response = await axiosRequest.post<IAuthData>(`/${AUTH_PATH}/login`, {
            email, password
        });
        return response.data;
    },
    register: async function (email: string, password: string): Promise<IAuthData> {
        const response = await axiosRequest.post<IAuthData>(`/${AUTH_PATH}/register`, { email, password })
        return response.data

    }
}