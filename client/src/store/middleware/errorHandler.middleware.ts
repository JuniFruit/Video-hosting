import { isRejectedWithValue, Middleware, MiddlewareAPI } from '@reduxjs/toolkit'
import messmessageActions from '../message/message.slice';

const {addMsg} = messmessageActions;


export const rtkQueryErrorLogger:Middleware = (api:MiddlewareAPI) => (next) => (action) => {
  if (isRejectedWithValue(action)) {
    api.dispatch(addMsg({message: 'Request failed', status: 500}));

  }

  return next(action)
}