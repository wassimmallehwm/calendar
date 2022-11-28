import { lazy } from 'react';
import { Route } from 'src/shared/types';
const Settings = lazy(() => import('../components/settings-management/Settings'));

const settingsRoutes: Route[] = [
    {
        path: "/admin",
        component: Settings,
        status: 'PROTECTED',
        roles: ["ADMIN"]
    }
]

export default settingsRoutes;