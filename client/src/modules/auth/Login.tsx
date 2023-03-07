import React, { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '@contexts/auth/AuthContext';
import authService from './auth.service';
import { SettingsContext } from '@contexts/settings/SettingsContext';
import { appImage } from '@utils/filePath';

const Login = () => {
    const { login } = useContext(AuthContext)
    const { settings } = useContext(SettingsContext)
    const navigate = useNavigate();
    const [loginInfo, setLoginInfo] = useState({
        username: 'admin@admin.com',
        password: 'password'
    })
    const [loading, setLoading] = useState(false)

    const { username, password } = loginInfo;

    const onChange = (e: any) => {
        const { name, value } = e.target;
        setLoginInfo({ ...loginInfo, [name]: value })
    }

    const onLogin = (data: any) => {
        login(data)
        // if(data.role.label == "ADMIN"){
        //     navigate('/settings/_')
        // } else {
        //     navigate('/')
        // }
        navigate('/')
    }

    const onSubmit = (e: any) => {
        e.preventDefault();
        setLoading(true)
        authService.authenticate(loginInfo).then(
            res => onLogin(res.data.user),
            error => {
                console.log("ERROR", error.response.data);
            }
        ).finally(() => {
            setLoading(false)
        })
    }

    return (
        <div className="bg-primary-50 h-full flex justify-center items-center">
            <div className="max-w-md w-full mx-auto bg-white px-8 py-8 rounded-lg shadow-lg">
                <div className="max-w-md w-full mx-auto flex flex-col items-center gap-4 py-2">
                    <img src={appImage(settings?.logo!)} className="w-32 text-center" />
                    <div className="text-2xl font-bold text-gray-800 text-center">
                        {settings?.name} | Login
                    </div>
                </div>
                <form action="" className="space-y-6" onSubmit={onSubmit}>
                    <div>
                        <label className="text-sm font-bold text-gray-600 block">
                            Email
                        </label>
                        <input type="email" name="username" onChange={onChange} value={username}
                            className="w-full p-2 border border-gray-300 rounded mt-1" />
                    </div>
                    <div>
                        <label className="text-sm font-bold text-gray-600 block">
                            Password
                        </label>
                        <input type="password" name="password" onChange={onChange} value={password}
                            className="w-full p-2 border border-gray-300 rounded mt-1" />
                    </div>
                    <div className="flex flex-col justify-center">
                        <div>
                            <a href="#" className="font-medium text-sm text-primary-500">
                                Forgot password ?
                            </a>
                        </div>
                    </div>
                    <div>
                        <button type="submit" disabled={loading} className={`w-full py-2 px-4 bg-primary-500 hover:bg-primary-600 
                        rounded-md text-white text-sm`}>
                            {loading ? 'Loading...' : 'Login'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login
