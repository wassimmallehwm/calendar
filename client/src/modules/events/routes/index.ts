import { Route } from '@shared/types';
import { lazy } from 'react';
const Calendar = lazy(() => import('../components/calendar/Calendar'));

const eventsRoutes: Route[] = [
    {
        path: "/calendar",
        component: Calendar,
        status: 'PROTECTED',
        roles: ["ALL"]
    },
]

export default eventsRoutes;