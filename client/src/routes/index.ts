import homeRoutes from "@modules/home/routes";
import authRoutes from "@modules/auth/routes";
import eventsRoutes from "@modules/events/routes";
import settingsRoutes from "@modules/settings/routes/";
import accountsRoutes from "@modules/users/routes";


const appRoutes: any[] = [
    ...homeRoutes,
    ...authRoutes,
    ...accountsRoutes,
    ...eventsRoutes,
    ...settingsRoutes
];

export default appRoutes;