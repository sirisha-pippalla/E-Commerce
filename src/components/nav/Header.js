import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { Menu } from "antd";
import {
  MailOutlined,
  AppstoreOutlined,
  SettingOutlined,
  UserOutlined,
  UserAddOutlined,
  LogoutOutlined
  
} from "@ant-design/icons";
import {Link} from "react-router-dom";

//access firebase directly from actual package
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

const { SubMenu, Item } = Menu;
const Header = () => {
  const [current, setCurrent] = useState("home");
  const dispatch = useDispatch()
  const {user} = useSelector((state)=>({...state}))

  //useDispatch --> whenever we want dispatch the data to the redux state so that update the redux state-->update the state

  //useSelector-->intead of updating the state we want to get the data from the state for eg:we have a user in that state we get that user. useSelector takes a function as argument
  let navigate = useNavigate();

  const handleClick = (e) => {
    //console.log(e.key)//
    setCurrent(e.key)
  };

  const logout = () => {
    firebase.auth().signOut()  //user logged out from firebase and we also update the redux state
    //for update the state we need dispatch
    dispatch({
      type:"LOGOUT",
      payload:null,
    });
    navigate("/login")
  }
  return (
    <Menu onClick={handleClick} selectedKeys={[current]} mode="horizontal">
      <Item key="home" icon={<AppstoreOutlined />}>
        <Link to="/" style={{ textDecoration:"none"}}>Home</Link>
      </Item>
      {!user && <Item key="register" icon={<UserAddOutlined/>}>
        <Link to="register" style={{ textDecoration:"none"}}>Register</Link>
      </Item>}

      {!user && <Item key="login" icon={<UserOutlined/>} style={{float:"right", textDecoration:"none"}}>
        <Link to="login" style={{ textDecoration:"none"}}>Login</Link>
      </Item>}
     

      {/* submenu means dropdown */}
      {user && (
        <SubMenu
         icon={<SettingOutlined />} 
         title={user.email && user.email.split('@')[0]} //getting user name from email what email is used to loggedin, in this we use split method, in this method the email is split from '@' and then we getting array eg:siri@gmail.com-->['siri', '@gmail.com']
         style={{float:"right"}}>
        <Item key="setting:1">Option 1</Item>
        <Item key="setting:2">Option 2</Item>
        <Item icon={<LogoutOutlined/>} onClick={logout}>Logout</Item>
      </SubMenu>
      )}
      
    </Menu>
  );
};

export default Header;
