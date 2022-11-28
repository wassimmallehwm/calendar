import { lazy } from 'react';
import { Route } from 'src/shared/types';
const CategoriesList = lazy(() => import('../components/categories-management/categories-list/CategoriesList'));

const categoriesRoutes: Route[] = [
    {
        path: "/categories",
        component: CategoriesList,
        status: 'PROTECTED',
        roles: ["ADMIN"]
    }
]

export default categoriesRoutes;