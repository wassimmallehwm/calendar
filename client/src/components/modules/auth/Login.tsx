import React, { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import { Button, Form } from 'semantic-ui-react';
import { AuthContext } from '../../../contexts/auth/AuthContext';
import { authenticate } from './auth.service';
import './login.css'

const Login = () => {
    const { login } = useContext(AuthContext)
    const navigate = useNavigate();
    const [loginInfo, setLoginInfo] = useState({
        username: '',
        password: ''
    })
    const [loading, setLoading] = useState(false)

    const { username, password } = loginInfo;

    const onChange = (e: any) => {
        const { name, value } = e.target;
        setLoginInfo({ ...loginInfo, [name]: value })
    }

    const onSubmit = (e: any) => {
        e.preventDefault();
        authenticate(loginInfo).then(
            res => {
                login(res.data)
                navigate('/')
            },
            error => {
                console.log("ERROR", error.response.data);
            }
        )
    }
    return (
        <div className="min-h-screen bg-gray-50 flex flex-col justify-center">
            <div className="max-w-md w-full mx-auto">
                <div className="text-3xl font-bold text-gray-800 mt-2 text-center">
                    Login page
                </div>
            </div>
            <div className="max-w-md w-full mx-auto mt-4 bg-white p-8 border border-gray-300">
                <form action="" className="space-y-6" onSubmit={onSubmit}>
                    <div>
                        <label className="text-sm font-bold text-gray-600 block">
                            Identifiant
                        </label>
                        <input type="text" name="username" onChange={onChange} value={username}
                            className="w-full p-2 border border-gray-300 rounded mt-1" />
                    </div>
                    <div>
                        <label className="text-sm font-bold text-gray-600 block">
                            Mot de passe
                        </label>
                        <input type="password" name="password" onChange={onChange} value={password}
                            className="w-full p-2 border border-gray-300 rounded mt-1" />
                    </div>
                    <div className="flex items-center justify-between">
                        <div>
                            <a href="#" className="font-medium text-sm text-blue-500">
                                Mot de passe oublié ?
                            </a>
                        </div>
                    </div>
                    <div>
                        <button type="submit" className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 
                        rounded-md text-white text-sm">
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login
