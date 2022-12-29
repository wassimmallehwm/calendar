import { Route } from '@shared/types';
import { lazy } from 'react';
const Users = lazy(() => import('../components/users-list/Users'));
const UsersProfile = lazy(() => import('../components/users-profile/UsersProfile'));

const accountsRoutes: Route[] = [
    {
        path: "/accounts",
        component: Users,
        status: 'PROTECTED',
        roles: ["ADMIN"]
    },
    {
        path: "/profile",
        component: UsersProfile,
        status: 'PROTECTED',
        roles: ["ALL"]
    }
]

export default accountsRoutes;