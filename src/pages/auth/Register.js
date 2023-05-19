import React, { useState } from "react";
import {auth} from "../../firebase";
import {toast} from "react-toastify";



const Register = () => {
  const [email, setEmail] = useState("");


  const handleSubmit = async (e) => {
    e.preventDefault();
   // console.log("ENV --->", process.env.REACT_APP_REGISTER_REDIRECT_URL)
    //to create a link by firebase(this link is send to user email for signin with password)
    const config = {
      url:process.env.REACT_APP_REGISTER_REDIRECT_URL,
      handleCodeInApp: true //this must be true
    }
    await auth.sendSignInLinkToEmail(email, config)
    toast.success(
      `Email is sent to ${email}. Click the link to completeyour registration.`
      );
    //save user email in local storage
    window.localStorage.setItem('emailForRegistration', email)
    console.log(window.localStorage.setItem, "email for registration")

    //clear the state
    setEmail('');
  };
  
  
  
  //handle onSubmit=>when user click on submit button send request to firebase and firebase can send eamil to user email address
  const registerForm = () => (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        className="form-control"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        autoFocus //when the user land this page first time this input field will be active by default
      >  
      </input>

      <button type="submit" style={{marginTop:"15px", borderRadius:"10px", cursor:"pointer", padding:"5px"}}>Register</button>
    </form>
  );

  return (
    <div className="container p-5">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <h4>Register</h4>
          {registerForm()}
        </div>
      </div>
    </div>
  );
};

export default Register;
