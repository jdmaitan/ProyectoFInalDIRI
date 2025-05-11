import { useContext } from 'react';
import { AuthContext, AuthContextProps } from './authContext';

export const useAuth = (): AuthContextProps => {
  return useContext(AuthContext);
};