import { lazy } from 'react';
import { Route } from 'src/shared/types';
const AppSettings = lazy(() => import('../components/settings-management/AppSettings'));

const settingsRoutes: Route[] = [
    {
        path: "/admin",
        component: AppSettings,
        status: 'PROTECTED',
        roles: ["ADMIN"]
    }
]

export default settingsRoutes;