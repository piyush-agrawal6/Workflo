"use client";
import React, { useEffect, useState } from "react";
import moment from "moment";
import "./TaskSection.css";
import TaskColumn from "../taskColumn/TaskColumn";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useDispatch } from "react-redux";
import { getTasks, updateTask } from "@/redux/task/action";
import { Dispatch } from "redux";

interface TaskSectionProps {
  searchQuery: string;
  filter: { priority?: string; deadline?: string };
}

const TaskSection: React.FC<TaskSectionProps> = ({ searchQuery, filter }) => {
  const { tasks } = useSelector((store: RootState) => store.task);
  const [activeCard, setActiveCard] = useState<string | null>(null);
  const dispatch: Dispatch<any> = useDispatch();

  const onDrop = (status: string) => {
    if (activeCard === null) return;

    const updatedTasks = tasks.map((task) => {
      if (task._id === activeCard) {
        return {
          ...task,
          status: status,
        };
      }
      return task;
    });

    const updatedTask = updatedTasks.find((task) => task._id === activeCard);
    if (updatedTask) {
      dispatch(updateTask(updatedTask._id, updatedTask));
    }
  };

  useEffect(() => {
    dispatch(getTasks());
  }, [dispatch]);

  const filteredTasks = tasks.filter((task) => {
    const matchesSearchQuery =
      (task.title && task.title.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (task.description && task.description.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesPriority = filter.priority ? task.priority === filter.priority : true;

    const matchesDeadline =
      filter.deadline === "today"
        ? moment(task.deadline).isSame(moment(), "day")
        : filter.deadline === "missed"
        ? task.deadline && task.deadline !== 0 && moment(task.deadline).isBefore(moment(), "day")
        : filter.deadline === "no-deadline"
        ? task.deadline === 0
        : true;

    return matchesSearchQuery && matchesPriority && matchesDeadline;
  });

  return (
    <div className="taskSection">
      <TaskColumn
        title="To do"
        tasks={filteredTasks}
        status="toDo"
        setActiveCard={setActiveCard}
        onDrop={onDrop}
      />
      <TaskColumn
        title="In progress"
        tasks={filteredTasks}
        status="inProgress"
        setActiveCard={setActiveCard}
        onDrop={onDrop}
      />
      <TaskColumn
        title="Under review"
        tasks={filteredTasks}
        status="underReview"
        setActiveCard={setActiveCard}
        onDrop={onDrop}
      />
      <TaskColumn
        title="Finished"
        tasks={filteredTasks}
        status="finished"
        setActiveCard={setActiveCard}
        onDrop={onDrop}
      />
    </div>
  );
};

export default TaskSection;
