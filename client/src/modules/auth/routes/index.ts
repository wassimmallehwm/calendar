import { lazy } from 'react';
const Login = lazy(() => import('../Login'));
const Signup = lazy(() => import('../signup/Signup'));

const authRoutes: any[] = [
    {
        path: "/signup",
        component: Signup,
        status: 'GUEST'
    },
    {
        path: "/login",
        component: Login,
        status: 'GUEST'
    }
    
]

export default authRoutes;