import React, { useReducer } from 'react';
import { AuthResponse } from '@shared/types';
import { AuthContext } from './AuthContext';
import storageService from '@shared/services/storage.service';

const initState: any = {
    user: null
}

const userData = storageService.getUserData();
if(userData){
    initState.user = userData;
}


function authReducer(state: any, action: any){
    switch(action.type){
        case 'LOGIN':
            return{
                ...state,
                user: action.payload
            }
        case 'LOGOUT':
            return{
                ...state,
                user: null
            }
        default: 
        return state
    }
}

export const AuthProvider = (props?: any) => {
    const [state, dispatch] = useReducer(authReducer, initState);

    const login = (userData: AuthResponse) => {
        storageService.setUserData(userData)
        dispatch({
            type: 'LOGIN',
            payload: userData
        })
    }

    const logout = () => {
        storageService.clearUserData()
        dispatch({type: 'LOGOUT'})
    }
    return(
        <AuthContext.Provider
            value={{user: state.user, login, logout}}
            {...props}
        />
    )
}
