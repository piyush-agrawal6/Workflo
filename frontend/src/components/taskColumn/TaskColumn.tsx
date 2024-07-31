"use client";

import React, { useState, useCallback } from "react";
import "./TaskColumn.css";
import SingleTask from "../singleTask/SingleTask";
import AddTaskDrawer from "../drawer/AddTaskDrawer";
import AddTask from "../buttons/AddTask";
import DropArea from "../dropArea/DropArea";
import { Dropdown, Menu } from "antd";
import { DownOutlined } from "@ant-design/icons";

interface Task {
  title: string;
  description?: string;
  priority?: string;
  deadline?: number;
  createdAt: number;
  status: string;
  _id: string;
}

interface TaskColumnProps {
  title: string;
  tasks: Task[];
  status: string;
  setActiveCard: (_id: string | null) => void;
  onDrop: (status: string) => void;
}

const TaskColumn: React.FC<TaskColumnProps> = ({
  title,
  tasks,
  status,
  setActiveCard,
  onDrop,
}) => {
  const [open, setOpen] = useState(false);
  const [currentStatus, setCurrentStatus] = useState<string | null>(null);
  const [sortKey, setSortKey] = useState<"priority" | "createdAt">("createdAt");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  const handleOpen = (status: string) => {
    setCurrentStatus(status);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setCurrentStatus(null);
  };

  const handleSort = (key: "priority" | "createdAt") => {
    setSortKey(key);
    setSortOrder((prevOrder) => (prevOrder === "asc" ? "desc" : "asc"));
  };

  const sortedTasks = tasks
    .filter((task) => task.status === status)
    .sort((a, b) => {
      if (sortKey === "priority") {
        return sortOrder === "asc"
          ? (a.priority || "").localeCompare(b.priority || "")
          : (b.priority || "").localeCompare(a.priority || "");
      } else {
        return sortOrder === "asc"
          ? a.createdAt - b.createdAt
          : b.createdAt - a.createdAt;
      }
    });

  const menu = (
    <Menu>
      <Menu.Item onClick={() => handleSort("priority")}>
        Sort by Priority{" "}
        {sortKey === "priority" && (sortOrder === "asc" ? "🔼" : "🔽")}
      </Menu.Item>
      <Menu.Item onClick={() => handleSort("createdAt")}>
        Sort by Creation Date{" "}
        {sortKey === "createdAt" && (sortOrder === "asc" ? "🔼" : "🔽")}
      </Menu.Item>
    </Menu>
  );

  return (
    <div className="taskColumn">
      <div className="taskColumnHeader">
        <p>{title}</p>
        <Dropdown overlay={menu} trigger={["hover"]}>
          <a onClick={(e) => e.preventDefault()} >
            <img src="./hamburger.svg" alt={title} />
          </a>
        </Dropdown>
      </div>
      <DropArea onDrop={() => onDrop(status)} />
      <div className="taskContainer">
        {sortedTasks.map((task, i) => (
          <React.Fragment key={i}>
            <SingleTask
              title={task.title}
              status={task.status}
              description={task.description}
              priority={task.priority}
              deadline={task.deadline}
              createdAt={task.createdAt}
              _id={task._id}
              setActiveCard={setActiveCard}
            />
            <DropArea onDrop={() => onDrop(status)} />
          </React.Fragment>
        ))}
      </div>
      <AddTask
        title="Add task"
        iconPath="./add.svg"
        onClick={() => handleOpen(status)}
        status={status}
      />
      <AddTaskDrawer open={open} onClose={handleClose} status={currentStatus} />
    </div>
  );
};

export default TaskColumn;
