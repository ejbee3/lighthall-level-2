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
};

const Task: React.FC<{ task: TaskProps }> = ({ task }) => {
  const authorName = task.author ? task.author.name : "Unknown author";
  return (
    <div>
      <h2>{task.title}</h2>
      <small>By {authorName}</small>
      <ReactMarkdown children={task.description} />
      <style jsx>{`
        div {
          color: inherit;
          padding: 2rem;
        }
      `}</style>
    </div>
  );
};

export default Task;
