import { lazy } from 'react';
const Calendar = lazy(() => import('../components/calendar/Calendar'));

const eventsRoutes: any[] = [
    {
        path: "/calendar",
        component: Calendar,
        status: 'PROTECTED',
        roles: ["ADMIN"]
    },
]

export default eventsRoutes;