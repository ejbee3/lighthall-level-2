import React from "react";
import Router from "next/router";
import ReactMarkdown from "react-markdown";

export type TaskProps = {
  id: string;
  title: string;
  author: {
    name: string;
  } | null;
  description: string;
  isNew: boolean;
  isInProgress: boolean;
  isCompleted: boolean;
  dueDate: string;
};

const Task: React.FC<{ task: TaskProps }> = ({ task }) => {

    const status = task.isNew ? "New" : task.isInProgress ? "In progress" : task.isCompleted ? "Completed" : "";

  return (
    <div onClick={() => Router.push("/p/update/[id]", `/p/update/${task.id}`)}>
        <small>{status}</small>
      <h2 className={task.isCompleted ? "completed" : "none"}>{task.title}</h2>
        <p>Due: {task.dueDate}</p>
        <p>Author: {task.author ? task.author.name : "Unknown author"}</p>
      <ReactMarkdown children={task.description} />
      <style jsx>{`
        div {
          color: inherit;
          padding: 2rem;
        }

        .new-status {
          font-style: italic;
        }

        .completed {
          text-decoration: line-through;
        }
      `}</style>
    </div>
  );
};

export default Task;
