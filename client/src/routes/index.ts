import homeRoutes from "@modules/home/routes";
import authRoutes from "@modules/auth/routes";
import usersRoutes from "@modules/users/routes";
import eventsRoutes from "@modules/events/routes";
import settingsRoutes from "@modules/settings/routes/";


const appRoutes: any[] = [
    ...homeRoutes,
    ...authRoutes,
    ...usersRoutes,
    ...eventsRoutes,
    ...settingsRoutes
];

export default appRoutes;