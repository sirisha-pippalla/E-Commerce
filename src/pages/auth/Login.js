import React, { useState, useEffect } from "react";
import { auth, googleAuthProvider } from "../../firebase";
import { toast } from "react-toastify";
import { Button } from "antd";
import { MailOutlined, GoogleOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import {createOrUpdateUser} from "../../functions/auth";



const Login = () => {
  const [email, setEmail] = useState("sirisha.pippalla7@gmail.com");
  const [password, setPassword] = useState("siri@35@");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector((state) => ({ ...state }));

  const roleBasedRedirect = (res) => {
    if(res.data.role === "admin"){
      navigate("/admin/dashboard")
    }else {
      navigate("/user/history")
    }
    };

  useEffect(() => {
    if (user && user.token) {
      navigate("/");
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    //console.table(email, password)

    //login through email and password
    //here we loggedin user with firebase
    //we make a request to firebase
    try {
      const result = await auth.signInWithEmailAndPassword(email, password);
      //console.log(result)
      //once we get results we can dispatch to redux store, later on we are going to make a request to our own db here, for create and update the user this is the way the date is not only save in firebase, the data also saves in our own database and from our own database we will be getting the response and that response is the one that will dispatch to redux store

      //dispatch to redux
      const { user } = result;
      const idTokenResult = await user.getIdTokenResult(); //once we get token here we can execute this like below

      //idTokenResult.token-->it gives user token, this user token will send to our backend as authtoken in headers.
      createOrUpdateUser(idTokenResult.token)
        .then((res) => {
          dispatch({
            type: "LOGGED_IN_USER",
            payload: {
              name: res.data.name,
              email: res.data.email,
              token: idTokenResult.token,
              role: res.data.role,
              _id: res.data._id,
            },
          });
          roleBasedRedirect(res);
        })
        .catch((err)=>console.log(err));

      //navigate("/");
    } catch (error) {
      console.log(error);
      toast.error(error.message);
      setLoading(false);
    }
  };
  //Login through Google
  const googleLogin = async () => {
    auth
      .signInWithPopup(googleAuthProvider)
      .then(async (result) => {
        const { user } = result;
        const idTokenResult = await user.getIdTokenResult();
        
        createOrUpdateUser(idTokenResult.token)
          .then((res) => {
            dispatch({
              type: "LOGGED_IN_USER",
              payload: {
                name: res.data.name,
                email: res.data.email,
                token: idTokenResult.token,
                role: res.data.role,
                _id: res.data._id,
              },
            });
            roleBasedRedirect(res);
          })
          .catch((err)=>console.log(err));
        //navigate("/");
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.message);
      });
  };

  const loginForm = () => (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <input
          type="email"
          placeholder="Your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="form-control"
          autoFocus
        ></input>
      </div>{" "}
      <br />
      <div className="form-group">
        <input
          type="password"
          placeholder="Enter your Password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          className="form-control"
        ></input>
      </div>{" "}
      <br />
      <Button
        onClick={handleSubmit}
        type="primary"
        className="mb-3"
        block
        shape="round"
        icon={<MailOutlined />}
        size="large"
        disabled={!email || password.length < 6}
      >
        Login with Email/Password
      </Button>
    </form>
  );

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          {loading ? (
            <h4 className="text-danger">Loading...</h4>
          ) : (
            <h4>Login</h4>
          )}{" "}
          <br />
          {loginForm()}
          <Button
            onClick={googleLogin}
            style={{ backgroundColor: "red", color: "white" }}
            className="mb-3"
            block
            icon={<GoogleOutlined />}
            size="large"
          >
            Login with Google
          </Button>
          <Link
            to="/forgot/password"
            className="text-danger"
            style={{ float: "right", textDecoration: "none" }}
          >
            Forgot Password
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
