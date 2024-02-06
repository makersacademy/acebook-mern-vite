import { useState } from "react"
import { postComment } from "../../services/posts"
import { createNotification } from "../../services/user"



export default function AddComment({ postId, toggleStateChange, post_userId }) {
    const [commentText, setCommentText] = useState("")
    const [token, setToken] = useState(window.localStorage.getItem("token"))
    const [user, setUserId] = useState(JSON.parse(window.localStorage.getItem("user")))
    const [errorMessage, setErrorMessage] = useState("")

    const handleChange = (event) => {
        setCommentText(event.target.value)
    }

    const submitComment  = async (event) => {
        // console.log("comment  userId", userId._id)
        event.preventDefault();
        if(commentText.length !== 0){
            try {
                const result = await postComment(token, commentText, postId, user._id)
                console.log(result)
                toggleStateChange()
                
                try {
                    const notificationResult = await createNotification({
                        username: userId.username, 
                        entity_userId: post_userId,
                        token: token,
                        notificationType: "post-comment"
                    })
                } catch (error) {
                    console.log("An error occured while creating a notification")
                }

            } catch (error) {
                setErrorMessage("An error occured while posting comment")
            }
        } else {
            setErrorMessage("empty comment") 
        }
    }

    return (
        <>
        {errorMessage && <p>{errorMessage}</p>}
        <form onSubmit={submitComment}>
            <input 
            type="text" 
            placeholder="g'day"
            value={commentText}
            onChange={handleChange} />
            <button type="submit">Submit</button>
        </form>
        </>
    )
}