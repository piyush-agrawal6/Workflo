"use client";
import React, { useState } from "react";
import "./DropArea.css";

interface DropAreaProps {
  onDrop: () => void;
}

const DropArea: React.FC<DropAreaProps> = ({ onDrop }) => {
  const [show, setShow] = useState(false);

  return (
    <div
      onDragEnter={() => setShow(true)}
      onDragLeave={() => setShow(false)}
      onDrop={() => {
        onDrop();
        setShow(false);
      }}
      onDragOver={(e) => e.preventDefault()}
      className={show ? "dropArea" : "hideArea"}
    >
      Drop here
    </div>
  );
};

export default DropArea;
