"use client";

import React from "react";
import "./CreateTaskBtn.css";

interface CreateTaskBtnProps {
  title: string;
  iconPath: string;
  style?: React.CSSProperties;
  onClick: () => void;
}

const CreateTaskBtn: React.FC<CreateTaskBtnProps> = ({
  title,
  iconPath,
  onClick,
  style,
}) => {
  return (
    <div className="createTaskBtn" onClick={onClick} style={style}>
      <p>{title}</p>
      <div>
        <img src={iconPath} alt={title} />
      </div>
    </div>
  );
};

export default CreateTaskBtn;
