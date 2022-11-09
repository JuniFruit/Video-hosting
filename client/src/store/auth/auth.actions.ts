import { createAsyncThunk } from '@reduxjs/toolkit'
import { IAuthForm } from '../../components/layout/header/right-elements/auth-form/AuthForm.interface';
import { IAuthData } from '../../services/auth/auth.interface'
import { AuthService } from '../../services/auth/auth.service'
import messageActions from '../message/message.slice'

const {addMsg} = messageActions;

export const register = createAsyncThunk<IAuthData, IAuthForm>(`auth/register`, async ({ email, password }, thunkAPI) => {
    

    try {
        const response = await AuthService.register(email, password);
        //Handle success
        thunkAPI.dispatch(addMsg({message: 'Registration successful', status: 200}))
        return response
    } catch (e:any) {
        thunkAPI.dispatch(addMsg({message: e.response.data.message, status: e.response.status}))
        return thunkAPI.rejectWithValue(e);
    }
})


export const login = createAsyncThunk<IAuthData, IAuthForm>(`auth/login`, async ({ email, password }, thunkAPI) => {

    try {
        const response = await AuthService.login(email, password);
        //Handle success
        thunkAPI.dispatch(addMsg({message: 'Login successful', status: 200}))
        return response
    } catch (e:any) {
        thunkAPI.dispatch(addMsg({message: e.response.data.message, status: e.response.status}))
        return thunkAPI.rejectWithValue(e);
    }
})

export const logout = createAsyncThunk<any, any>(`auth/logout`, async({},thunkAPI) => {
    thunkAPI.dispatch(addMsg({message: 'Logout successful', status: 200}))
    return {};
})