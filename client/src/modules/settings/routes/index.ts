import { Route } from 'src/shared/types';
import accountsRoutes from './accounts';
import adminRoutes from './admin';
import categoriesRoutes from './categories';
const SEETINGS_PATH = "/settings"

const settingsRoutes: Route[] = [
    ...adminRoutes,
    ...accountsRoutes,
    ...categoriesRoutes
].map((route: Route) => {
    route.path = SEETINGS_PATH + route.path;
    return route;
})


export default settingsRoutes;