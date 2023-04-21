import React from "react";
import Router from "next/router";
import ReactMarkdown from "react-markdown";

export type TaskProps = {
  id: string;
  title: string;
  userName: string;
  description: string;
  isNew: boolean;
  isInProgress: boolean;
  isCompleted: boolean;
  dueDate: string;
};

const Task: React.FC<{ task: TaskProps }> = ({ task }) => {

  const status = task.isNew ? "New" : task.isInProgress ? "In progress" : task.isCompleted ? "Completed" : "";

  const formatDueDate = (date: string) => `${date.slice(5, 7)}-${date.slice(-2)}-${date.slice(0, 4)}`;
  const completedClasses = " bg-base-200";

  return (
    <div key={task.id} className={"card w-96 bg-base-100 shadow-xl m-2 p-3 cursor-pointer" + " " + (task.isCompleted ? completedClasses : "")} onClick={() => Router.push("/p/update/[id]", `/p/update/${task.id}`)}>
      <div className={(status ? "badge": "") + " " + (status == "New" ? "badge-primary" : status == "In progress" ? "badge-secondary" : "")}>{status}</div>
      <h2 className={(task.isCompleted ? "line-through" : "") + " " + "card-title"}>{task.title}</h2>
        <div>Due: {formatDueDate(task.dueDate)}</div>
      <p>By {task.userName}</p>
      <ReactMarkdown children={task.description} />

    </div>
  );
};

export default Task;
