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

    sendEventNotif = async (io, content, notifEnum) => {

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
            let flag = ''

            if (isPrivate && allowedViewers.length > 0) {
                usersResp = await UserService.findMinByGroups(allowedViewers)
                flag = 'GROUPS'
            } else {
                usersResp = await UserService.findAllMin()
                flag = 'ALL'
            }
            users = usersResp.content //.map(elem => elem._id)

            if (appNotifs) {
                console.log("APP NOTIF to ", users)
                if (flag == 'ALL') {
                    NotificationsService.sendNotifToAll(
                        io,
                        users.map(elem => elem._id),
                        notifEnum,
                        {
                            title,
                            createdBy: createdBy.displayName
                        },
                        'EVENTS'
                    )
                }

                if (flag == 'GROUPS') {
                    //Send notif to groups
                }

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
