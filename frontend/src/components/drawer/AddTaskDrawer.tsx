"use client";

import React, { useState, useEffect } from "react";
import { Drawer } from "antd";
import "./drawer.css";
import { useDispatch } from "react-redux";
import { Dispatch } from "redux";
import { createTask } from "@/redux/task/action";
import { showSuccess, showError } from "@/utils/notification";

interface DrawerComponentProps {
  open: boolean;
  onClose: () => void;
  status?: string | null;
}

interface FormValues {
  description: string;
  priority: string;
  deadline: number;
  status: string;
}

const DrawerComponent: React.FC<DrawerComponentProps> = ({
  open,
  onClose,
  status,
}) => {
  const [formValues, setFormValues] = useState<FormValues>({
    description: "",
    priority: "",
    deadline: 0,
    status: status || "",
  });
  const [title, setTitle] = useState<string>("");
  const [isFormValid, setIsFormValid] = useState<boolean>(false);
  const dispatch: Dispatch<any> = useDispatch();

  useEffect(() => {
    if (status) {
      setFormValues((prevValues) => ({ ...prevValues, status }));
    }
  }, [status]);

  useEffect(() => {
    const { status } = formValues;
    setIsFormValid(title.trim() !== "" && status !== "");
  }, [formValues, title]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({ ...prevValues, [name]: value }));
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormValues((prevValues) => ({
      ...prevValues,
      deadline: new Date(e.target.value).getTime(),
    }));
  };

  const handleSubmit = () => {
    if (!isFormValid) {
      showError("Please fill out all required fields.");
      return;
    }
    const data = { ...formValues, title };
    dispatch(createTask(data))
      .then(() => {
        showSuccess("Task created successfully.");
        onClose();
      })
      .catch(() => {
        showError("Failed to create task. Please try again.");
      });
  };

  return (
    <Drawer width={650} title="Basic Drawer" onClose={onClose} open={open}>
      <div className="drawerHeader">
        <div>
          <img src="./close.svg" alt="close icon" onClick={onClose} />
          <img src="./maximize.svg" alt="maximize icon" />
        </div>
        <div>
          <div>
            <p>Share</p>
            <img src="./share.svg" alt="share icon" />
          </div>
          <div>
            <p>Favorite</p>
            <img src="./fav.svg" alt="favorite icon" />
          </div>
        </div>
      </div>
      <div className="drawerBody">
        <div className="drawerBodyTitle">
          <input
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="drawerBodyForm">
          <form onSubmit={(e) => e.preventDefault()}>
            <div>
              <div>
                <img src="./status.svg" alt="status icon" />
                <label htmlFor="status">Status</label>
              </div>
              <select
                name="status"
                value={formValues.status}
                onChange={handleChange}
                required
              >
                <option value="">Not selected</option>
                <option value="toDo">To do</option>
                <option value="inProgress">In progress</option>
                <option value="underReview">Under review</option>
                <option value="finished">Finished</option>
              </select>
            </div>
            <div>
              <div>
                <img src="./priority.svg" alt="priority icon" />
                <label htmlFor="priority">Priority</label>
              </div>
              <select
                name="priority"
                value={formValues.priority}
                onChange={handleChange}
              >
                <option value="">Not selected</option>
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="Urgent">Urgent</option>
              </select>
            </div>
            <div>
              <div>
                <img src="./calender.svg" alt="calendar icon" />
                <label htmlFor="deadline">Deadline</label>
              </div>
              <input type="date" name="deadline" onChange={handleDateChange} />
            </div>
            <div>
              <div>
                <img src="./pencil.svg" alt="description icon" />
                <label htmlFor="description">Description</label>
              </div>
              <input
                placeholder="Not added"
                name="description"
                value={formValues.description}
                onChange={handleChange}
              />
            </div>
          </form>
        </div>
      </div>
      <div className="drawerFooter">
        <button
          style={{ cursor: `${isFormValid ? "pointer" : "not-allowed"}` }}
          type="button"
          onClick={handleSubmit}
          className="addTaskBtn"
        >
          Save
        </button>
      </div>
    </Drawer>
  );
};

export default DrawerComponent;
