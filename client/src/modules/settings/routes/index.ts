import { Route } from 'src/shared/types';
import adminRoutes from './admin';
import categoriesRoutes from './categories';
import groupsRoutes from './groups';
const SEETINGS_PATH = "/settings"

const settingsRoutes: Route[] = [
    ...adminRoutes,
    ...categoriesRoutes,
    ...groupsRoutes
].map((route: Route) => {
    route.path = SEETINGS_PATH + route.path;
    return route;
})


export default settingsRoutes;