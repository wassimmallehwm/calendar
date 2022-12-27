import { lazy } from 'react';
import { Route } from 'src/shared/types';
const AccountsList = lazy(() => import('../components/accounts-management/accounts-list/AccountsList'));
const AccountsForm = lazy(() => import('../components/accounts-management/accounts-form/AccountsForm'));
const AccountsProfil = lazy(() => import('../components/accounts-management/accounts-profil/AccountsProfil'));

const accountsRoutes: Route[] = [
    {
        path: "/accounts",
        component: AccountsList,
        status: 'PROTECTED',
        roles: ["ADMIN"]
    },
    {
        path: "/accounts/add",
        component: AccountsForm,
        status: 'PROTECTED',
        roles: ["ADMIN"]
    },
    {
        path: "/accounts/:id",
        component: AccountsForm,
        status: 'PROTECTED',
        roles: ["ADMIN"]
    },
    {
        path: "/profil",
        component: AccountsProfil,
        status: 'PROTECTED',
        roles: ["ALL"]
    },
    {
        path: "/profil/:id",
        component: AccountsProfil,
        status: 'PROTECTED',
        roles: ["ADMIN"]
    }
]

export default accountsRoutes;