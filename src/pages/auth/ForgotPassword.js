import React, {useEffect, useState} from "react";
import {auth} from "../../firebase";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";



//useSelector:
//from redux store we actually access the user for that we use useSelector, the reason for using the --
//--useSelector-->when the user is login i dont want to show this page

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const {user} = useSelector((state) => ({...state}));

    const navigate = useNavigate()

    useEffect(()=>{
        if(user && user.token){
            navigate('/')
        };
    }, [user])

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)

        const config = {
            url:process.env.REACT_APP_FORGOT_PASSWORD_REDIRECT,
            handleCodeInApp: true //this must be true
        };
        await auth.sendPasswordResetEmail(email, config)
        .then(()=>{
            setEmail('')
            setLoading(false)
            toast.success("check your email for password reset link")

        })
        .catch((error) => {
            setLoading(false);
            toast.error(error.message);
            console.log("forgot password error", error)
        });
    };
    return(
        <div className="container col-md-6 offset-md-3 p-5">
           {loading ? (
           <h4 className="text-danger">Loading...</h4>
            ) : (
            <h4>Forgot Password</h4>
            )}

            <form onSubmit={handleSubmit}>
                <input
                type="email"
                className="form-control"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Type Your Email"
                autoFocus
                />
                <button className="mt-4 p-1 btn btn-primary " disabled={!email}>Submit</button>
            </form>
        </div>
    )
}
export default ForgotPassword;