import React from "react";
import "./navElements.css";
interface NavElementsProps {
  iconPath: string;
  title: string;
}

const NavElements: React.FC<NavElementsProps> = ({ iconPath, title }) => {
  return (
    <div className={`${title == "Home" ? "focus navElement" : "navElement"}`}>
      <div>
        <img src={iconPath} alt={title} />
      </div>
      <p>{title}</p>
    </div>
  );
};

export default NavElements;
