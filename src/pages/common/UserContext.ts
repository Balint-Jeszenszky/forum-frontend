import { createContext } from 'react';
import { Login } from '../../models/User';

export const UserContext = createContext<Login>({});
