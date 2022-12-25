import { lazy } from 'react';
import { Route } from 'src/shared/types';
const GroupsList = lazy(() => import('../components/groups-management/groups-list/GroupsList'));

const groupsRoutes: Route[] = [
    {
        path: "/groups",
        component: GroupsList,
        status: 'PROTECTED',
        roles: ["ADMIN"]
    }
]

export default groupsRoutes;