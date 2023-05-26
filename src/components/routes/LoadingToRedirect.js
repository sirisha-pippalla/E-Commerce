import React, {useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";

const LoadingToRedirect = () => {
    const [count, setCount] = useState(5);
    const navigate = useNavigate();
    useEffect(() => {
        const intervel = setInterval(()=>{
            //here i m going to decrement the count
            setCount((currentCount) => --currentCount);
        }, 1000)
        //redirect once count is equal to "0"
        count === 0 && navigate("/")
        //cleanup the intervel
        return () => clearInterval(intervel)
    }, [count])
  return (
    <div className='container p-5 text-center'>
        <p>Redirecting you in {count} seconds</p>
    </div>
  );
};

export default LoadingToRedirect;