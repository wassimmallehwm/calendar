const { ResponseSuccess, ResponseError } = require("../../shared/response");
const { ErrorsHandler, PermissionsHandler } = require("../../utils");
const Event = require("./event.model");
const EventDto = require("./event.dto");
const { NotificationsService } = require("../notifications");
const { UserService } = require("../users");

const SERVICE_NAME = "EventNotificationService"

class EventNotificationService {

    constructor() {
    }

    static instance = new EventNotificationService()

    sendEventNotif = async (io, userId, content, notifEnum) => {

        try {
            const {
                title,
                createdBy,
                allowedViewers,
                isPrivate,
                appNotifs,
                emailNotifs
            } = content
            if (!appNotifs || !emailNotifs) {
                return
            }

            let usersResp = null
            let users = []
            let usersId = []

            if (isPrivate && allowedViewers.length > 0) {
                usersResp = await UserService.findMinByGroups(allowedViewers)
            } else {
                usersResp = await UserService.findAllMin()
            }
            users = usersResp.content
            usersId = users.map(elem => elem._id).filter(elem => elem != userId)

            if (appNotifs) {
                NotificationsService.sendNotifToAll(
                    io,
                    usersId,
                    notifEnum,
                    {
                        title,
                        createdBy: createdBy.displayName
                    },
                    'EVENTS'
                )
            }


            if (emailNotifs) {
                //Send email notif to users
            }

        } catch (err) {
            return new ResponseError(
                ErrorsHandler.handle(err, `${SERVICE_NAME}:create`)
            )
        }

    }
}

module.exports = EventNotificationService.instance
