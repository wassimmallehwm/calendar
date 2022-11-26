const appConfigRoutes = require('./app-config.routes')
const AppConfigService = require('./app-config.service')

module.exports = {
    routes: appConfigRoutes,
    AppConfigService
};