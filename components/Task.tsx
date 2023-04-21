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
  return (
    <div onClick={() => Router.push("/p/update/[id]", `/p/update/${task.id}`)}>
      {task.isNew && <small className="new-status">New!</small>}
      {task.isInProgress && <small className="new-status">In progress!</small>}
      {task.isCompleted && <small className="new-status">Completed! 😊</small>}
      <h2 className={task.isCompleted ? "completed" : "none"}>{task.title}</h2>
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
