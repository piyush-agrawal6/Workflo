import React from "react";
import "./Header.css";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { getGreeting } from "@/utils/getGreeting";

const Header: React.FC = () => {
  const { name } = useSelector((store: RootState) => store.auth.user);
  const greeting = getGreeting();

  return (
    <div className="header">
      <p>{`${greeting}, ${name?.split(" ")[0]}`}</p>
      <div>
        <p>Help & feedback</p>
        <img src="./help.svg" alt="Help" />
      </div>
    </div>
  );
};

export default Header;
