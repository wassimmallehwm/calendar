import React from 'react';
import { Account } from '@modules/settings/models/Account';

export interface AuthContextInterface {
  user: Account | null;
  login: (userData: Account) => void;
  logout: () => void;
}

export const authContextDefaults: AuthContextInterface = {
  user: null,
  login: (userData: Account) => null,
  logout: () => null
};

export const AuthContext = React.createContext<AuthContextInterface>(
  authContextDefaults
);