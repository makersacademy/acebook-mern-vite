import { deleteNotification } from "../../services/user"


export default function Notification({username, notification, token, triggerStateChange}) {

    
    const acknowledgeNotification = async() => {
        try {
            const response = await deleteNotification(username, notification._id, token)
            console.log(response)
            triggerStateChange()
        } catch (error) {
            console.log(error)
        }
    }

    return (
            <>
            <p>{notification.message}</p> 
            
            <button
            onClick={acknowledgeNotification}
            >x</button> 
            </>
        )

}