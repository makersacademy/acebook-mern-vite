import { useState } from 'react';

const DisplayErrorMessage = (props) => {
    const [errorField, setErrorField] = useState([])
    
    useState(() => {
        
        setErrorField([...errorField, props.errMsg])

    }, [props.errMsg]);
return (
        <div>
            {errorField.map((error, index) => (
                <p key={index}>{error}</p>
            ))}
        </div>
)
} 

export default DisplayErrorMessage