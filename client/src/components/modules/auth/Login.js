import React, { useState, useContext } from 'react'
import { Button, Form, Grid } from 'semantic-ui-react';
import { AuthContext } from '../../../contexts/AuthContext';
import { authenticate } from './auth.service';
import './login.css'

const Login = ({history}) => {
    const { login } = useContext(AuthContext)
    const [loginInfo, setLoginInfo] = useState({
        username: '',
        password: ''
    })
    const [loading, setLoading] = useState(false)

    const { username, password } = loginInfo;

    const onChange = (e) => {
        const { name, value } = e.target;
        setLoginInfo({ ...loginInfo, [name]: value })
    }

    const onSubmit = (e) => {
        e.preventDefault();
        authenticate(loginInfo).then(
            res => {
                login(res.data)
                history.push('/')
            },
            error => {
                console.log("ERROR", error.response.data.msg);
            }
        )
    }
    return (
        <div className="login-container">
            <div className="login-section"></div>
            <div className="login-section login-form-container">
                <Form onSubmit={onSubmit} className={loading ? "loading" : ''} noValidate>
                    <h1>Login</h1>

                    <Form.Input
                        label="Username"
                        placeholder="Username"
                        name="username"
                        type="username"
                        value={username}
                        //error={errors.username ? true : false}
                        onChange={onChange}
                    />

                    <Form.Input
                        label="Password"
                        placeholder="Password"
                        name="password"
                        type="password"
                        value={password}
                        //error={errors.password ? true : false}
                        onChange={onChange}
                    />
                    <Button fluid type="submit" primary>
                        Login
                    </Button>
                </Form>
            </div>
        </div>
    )
}

export default Login
