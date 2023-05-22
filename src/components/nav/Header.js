import React, { useState } from "react";
import { Menu } from "antd";
import {
  MailOutlined,
  AppstoreOutlined,
  SettingOutlined,
  UserOutlined,
  UserAddOutlined
  
} from "@ant-design/icons";
import {Link} from "react-router-dom";

//access firebase directly from actual package
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

const { SubMenu, Item } = Menu;
const Header = () => {
  const [current, setCurrent] = useState("home");

  const handleClick = (e) => {
    //console.log(e.key)//
    setCurrent(e.key)
  };
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
        <Item >Logout</Item>
      </SubMenu>
    </Menu>
  );
};

export default Header;
