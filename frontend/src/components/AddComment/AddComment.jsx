import { useState } from "react"
import { postComment } from "../../services/posts"


export default function AddComment({ postId, toggleStateChange }) {
    const [commentText, setCommentText] = useState("")
    const [token, setToken] = useState(window.localStorage.getItem("token"))
    const [userId, setUserId] = useState(JSON.parse(window.localStorage.getItem("user")))
    const [errorMessage, setErrorMessage] = useState("")

    const handleChange = (event) => {
        setCommentText(event.target.value)
    }

    const submitComment  = async (event) => {
        event.preventDefault();
        if(commentText.length !== 0){
            try {
                const result = await postComment(token, commentText, postId, userId._id)
                console.log(result)
                toggleStateChange()
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