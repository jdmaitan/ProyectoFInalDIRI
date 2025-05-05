import { Middleware } from '@reduxjs/toolkit';

const loggerMiddleware: Middleware = (store) => (next) => (action) =>
{
    console.log('Ejecutando acción:', action);
    console.log('Estado anterior:', store.getState());
    const result = next(action);
    console.log('Nuevo estado:', store.getState());
    return result;
};

export default loggerMiddleware;