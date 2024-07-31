"use client";

import React from "react";
import "./AddTask.css";

interface AddTaskProps {
  title: string;
  iconPath: string;
  status: string;
  onClick: (status: string) => void;
}

const AddTask: React.FC<AddTaskProps> = ({
  title,
  iconPath,
  onClick,
  status,
}) => {
  return (
    <div className="addTask" onClick={() => onClick(status)}>
      <p>{title}</p>
      <div>
        <img src={iconPath} alt={title} />
      </div>
    </div>
  );
};

export default AddTask;
