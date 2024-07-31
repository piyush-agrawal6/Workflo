"use client";

import React, { useState, useEffect } from "react";
import { MdDeleteOutline, MdOutlineModeEdit } from "react-icons/md";
import {
  Button,
  Modal,
  Tooltip,
  Form,
  Input,
  Select,
  DatePicker,
  Popconfirm,
} from "antd";
import moment from "moment";
import "./SingleTask.css";
import { timeAgo } from "@/utils/timeago";
import { dateformat } from "@/utils/dateformat";
import { useDispatch } from "react-redux";
import { Dispatch } from "redux";
import { deleteTask, updateTask } from "@/redux/task/action";
import { showSuccess, showError } from "@/utils/notification";

const { Option } = Select;

interface SingleTaskProps {
  title: string;
  description?: string;
  priority?: string;
  deadline?: number;
  createdAt: number;
  status: string;
  _id: string;
  setActiveCard: (_id: string | null) => void;
}

const SingleTask: React.FC<SingleTaskProps> = ({
  title,
  description,
  priority,
  deadline,
  createdAt,
  status,
  _id,
  setActiveCard,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();
  const [isEdited, setIsEdited] = useState(false);
  const dispatch: Dispatch<any> = useDispatch();

  const confirm = () => {
    dispatch(deleteTask(_id))
      // .then(() => {
      //   showSuccess("Task deleted successfully.");
      // })
      // .catch(() => {
      //   showError("Failed to delete task. Please try again.");
      // });
  };

  const cancel = () => {
    console.log("cancelled");
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    form.validateFields().then((values) => {
      let data = {
        ...values,
        createdAt,
        deadline: values.deadline ? new Date(values.deadline).getTime() : 0,
      };
      dispatch(updateTask(_id, data))
        // .then(() => {
        //   showSuccess("Task updated successfully.");
        //   setIsModalOpen(false);
        // })
        // .catch(() => {
        //   showError("Failed to update task. Please try again.");
        // });
    });
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleFormChange = () => {
    setIsEdited(form.isFieldsTouched());
  };

  useEffect(() => {
    if (isModalOpen) {
      form.setFieldsValue({
        title,
        description,
        priority,
        deadline: deadline ? moment(deadline) : null,
        status,
      });
    }
  }, [isModalOpen, form, title, description, priority, deadline, status]);

  return (
    <div
      className="singleTask"
      draggable
      onDragStart={() => setActiveCard(_id)}
      onDragEnd={() => setActiveCard(null)}
    >
      <p>{title}</p>
      {description && <h3>{description}</h3>}
      {priority && (
        <button className={`priority-${priority.toLowerCase()}`}>
          {priority}
        </button>
      )}
      {deadline !== 0 && (
        <div className="singleTaskDeadline">
          <img src="./clock.svg" alt="clock icon" />
          <p>{dateformat(deadline || 0)}</p>
        </div>
      )}
      <div className="singleTaskEdit">
        <span>{timeAgo(createdAt)}</span>
        <div>
          <Tooltip placement="topLeft" title="Edit Task">
            <MdOutlineModeEdit onClick={showModal} />
          </Tooltip>
          <Tooltip placement="topLeft" title="Delete Task">
            <Popconfirm
              title="Delete the task"
              description="Are you sure to delete this task?"
              onConfirm={confirm}
              onCancel={cancel}
              okText="Yes"
              cancelText="No"
            >
              <MdDeleteOutline />
            </Popconfirm>
          </Tooltip>
        </div>
      </div>
      <Modal
        title="Edit task"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handleCancel}>
            Cancel
          </Button>,
          <Button
            key="submit"
            type="primary"
            onClick={handleOk}
            disabled={!isEdited}
          >
            Edit
          </Button>,
        ]}
      >
        <Form
          form={form}
          layout="vertical"
          className="editTaskForm"
          onFieldsChange={handleFormChange}
        >
          <Form.Item
            label="Title"
            name="title"
            rules={[{ required: true, message: "Please enter the title" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Description"
            name="description"
            rules={[{ message: "Please enter the description" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Status"
            name="status"
            rules={[{ required: true, message: "Please select the status" }]}
          >
            <Select>
              <Option value="toDo">To do</Option>
              <Option value="inProgress">In progress</Option>
              <Option value="underReview">Under review</Option>
              <Option value="finished">Finished</Option>
            </Select>
          </Form.Item>
          <Form.Item
            label="Priority"
            name="priority"
            rules={[{ message: "Please select the priority" }]}
          >
            <Select>
              <Option value="low">Low</Option>
              <Option value="medium">Medium</Option>
              <Option value="urgent">Urgent</Option>
            </Select>
          </Form.Item>
          <Form.Item label="Deadline" name="deadline">
            <DatePicker
              format="YYYY-MM-DD"
              value={
                form.getFieldValue("deadline")
                  ? moment(form.getFieldValue("deadline"))
                  : null
              }
              onChange={(date) => form.setFieldsValue({ deadline: date })}
            />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default SingleTask;
