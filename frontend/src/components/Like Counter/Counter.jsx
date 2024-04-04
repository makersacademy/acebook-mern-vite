import { useState } from "react";

const Counter = () => {
    const [count, setCount] = useState(0);
  
    const incrementCounter = () => {
      setCount(count + 1);
    };

    const decrementCounter = () => {
      setCount(count - 1);
    };
  
    return (
      <div>
        <h1>{count}</h1>
        <button onClick={incrementCounter}>Like</button>
        <button onClick={decrementCounter}>Dislike</button>
      </div>
    );    
};

export default Counter;