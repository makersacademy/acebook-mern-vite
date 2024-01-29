import React from 'react';

const NewPostForm = () => {
    return (
        <form><label>Message:
            <input type="text" name="message" />
            </label>
            <label>
                <input type="submit" name="submit" />
            </label>
            </form>
    )
}

export default NewPostForm