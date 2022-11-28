import React, { useReducer } from 'react';
import { Settings } from '@shared/types';
import { SettingsContext } from './SettingsContext';
import storageService from '@shared/services/storage.service';

const initState: any = {
    settings: null
}

const settings = storageService.getSettings();
if(settings){
    initState.settings = settings;
}

function settingsReducer(state: any, action: any){
    switch(action.type){
        case 'SETSETTINGS':
            return{
                ...state,
                settings: action.payload
            }
        default: 
        return state
    }
}

export const SettingsProvider = (props?: any) => {
    const [state, dispatch] = useReducer(settingsReducer, initState);

    const setSettings = (settingsData: Settings | null) => {
        storageService.setSettings(settingsData!)
        dispatch({
            type: 'SETSETTINGS',
            payload: settingsData
        })
    }

    return(
        <SettingsContext.Provider
            value={{settings: state.settings, setSettings}}
            {...props}
        />
    )
}
