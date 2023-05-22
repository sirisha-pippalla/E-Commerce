import React, { useState } from "react";
import { useDispatch } from "react-redux";
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
        <Link to="/">Home</Link>
      </Item>
      <Item key="register" icon={<UserAddOutlined/>}>
        <Link to="register">Register</Link>
      </Item>
      <Item key="login" icon={<UserOutlined/>} style={{float:"right"}}>
        <Link to="login">Login</Link>
      </Item>
     

      {/* submenu means dropdown */}
      <SubMenu icon={<SettingOutlined />} title="USername">
        <Item key="setting:1">Option 1</Item>
        <Item key="setting:2">Option 2</Item>
        <Item icon={<LogoutOutlined/>} onClick={logout}>Logout</Item>
      </SubMenu>
    </Menu>
  );
};

export default Header;
