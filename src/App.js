import React, {useEffect} from "react";
import {Routes, Route} from "react-router-dom";
//import { Dispatch } from "redux";//
import {ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";



import Home from "./pages/Home";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Header from "./components/nav/Header";
import RegisterComplete from "./pages/auth/RegisterComplete";
//here we access friebase auth function to access the currently logedin user
import {auth} from "./firebase";
//dispatching the action and payload so that we can update the redux store. for that we can access the useDispatch hook from react-redux
import {useDispatch} from "react-redux";

//when this component mount means when ever there was a change we want to access this firebase auth currnt user auth state so for that we use useEffect 

const App = () => {
  
  const dispatch = useDispatch();

  //to check firebase auth state
  useEffect(()=>{
    //accesing currently logedin user from the firebase, if there is a user currently loged in user then we get that information here and that information we want to dispatch to the redux store


    //once we get the information we want to cleanup the state
    //onAuthStateChanged()--> this method gives the user
    const unsubscribe = auth.onAuthStateChanged(async (user)=>{
      if(user){
        //if the user exist in frebase we get the user details, if it doesnot have loggedin user we get undefined.

        //if there is a user then we want to get this user's token
        const idTokenResult = await user.getIdTokenResult() //this method will gives user token
        console.log("name", user)

        //once we get the token we need to dispatch this token to redux store
        //in dispatch method we can give the type and payload(its should be same what we are mention in userReducer file)
        dispatch({
          type:"LOGGED_IN_USER",
          payload:{
            email:user.email,
            token:idTokenResult.token
          }
        })
      }
    });
    //cleanup
    return () => unsubscribe()
  }, [])



  return (
    <>
    <Header/>
    <ToastContainer/>
    <Routes>
      <Route path = "/" element={<Home/>}/>
      <Route path = "/login" element={<Login/>}/>
      <Route path = "/register" element={<Register/>}/>
      <Route path = "/register/complete" element={<RegisterComplete/>}/>
    </Routes>
    </>
  );
}

export default App;
