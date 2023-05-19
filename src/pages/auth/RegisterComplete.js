import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { auth } from "../../firebase";

//here we grap the email from local storage for that we use "useEffect hook"
const RegisterComplete = ({history}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

    useEffect(()=>{
     // console.log(window.localStorage.getItem('emailForRegistration'))//
     setEmail(window.localStorage.getItem('emailForRegistration'))
    //  console.log(window.localStorage.getItem('emailForRegistration'))
    //  console.log(window.location.href)
    }, []);

  const handleSubmit = async(e) => {
    e.preventDefault();

    //validation
    if(!email || !password){
        toast.error("email and password is required")
        return; //if the error is occure it should not distrub the remaining code so for that wenuse return key word
    }
    if(password < 6){
        toast.error("password must be atleast 6 charcters length")
        return;
    }
    try{
        const result = await auth.signInWithEmailLink(email, window.location.href) //email verification(log in user with email link)
        //window.location.href ---> for grabbing the entire URL in register/complete page
        // console.log(result, "RESULT")

        if(result.user.emailVerified){
            //remove user email from local storage
            window.localStorage.removeItem('emailForRegistration');
            //get user id token--> for this we use json web token, later it will integrate with our backend, so this is the way to communicate.
            let user = auth.currentUser //in this "auth" is from firebase, it gives currently logedin user
            //update currently loggedin user password
            await user.updatePassword(password);
            //getting token
            const idTokenResult = await user.getIdTokenResult()
            console.log("user", user, "idTokenResult", idTokenResult)
            //redux store
            //redirect
            history.push("/")
        }

    }catch(error){
        console.log(error);
        toast.error(error.message);
    }
  };

  const CompleteRegisterationForm = () => (
    <form onSubmit={handleSubmit}>
      <input type="email" className="form-control"value={email} disabled/>
      <input
      type="password"
      placeholder="Enter Your Password"
      className="form-control mt-2"
      autoFocus
      value={password}
      onChange={(e)=>setPassword(e.target.value)}
      />

      <button type="submit" style={{marginTop:"15px", borderRadius:"10px", cursor:"pointer", padding:"5px"}}>Complete Registeration</button>
    </form>
  );

  
  return (
    <div className="container p-5">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <h4>Register Complete</h4>
          {CompleteRegisterationForm()}
        </div>
      </div>
    </div>
  );
};

export default RegisterComplete;
