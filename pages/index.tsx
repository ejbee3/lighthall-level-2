import React, { useState } from "react"
import { GetServerSideProps } from "next"
import Layout from "../components/Layout"
import Task, { TaskProps } from "../components/Task"
import prisma from '../lib/prisma';

export const getServerSideProps: GetServerSideProps = async () => {
  const list = await prisma.task.findMany({
    where: { isNew: true },
    include: {
      author: {
        select: { name: true },
      }
    }
  })
  return {
    props: { list }
  }
}


type Props = {
  list: TaskProps[]
}

const TaskList: React.FC<Props> = (props) => {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [dueDate, setDueDate] = useState('')

  const submitData = async (e: React.SyntheticEvent) => {
    e.preventDefault()
    try {
      const body = { title, description, dueDate }
      await fetch('/api/task', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      })
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <Layout>
      <div className="page">
        <h1>Tasks</h1>
        <main>
          {props.list.map((task) => (
            <div key={task.id} className="task">
              <Task task={task} />
            </div>
          ))}
          <div>
            <form onSubmit={submitData}>
              <input
                autoFocus
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Title"
                type="text"
                value={title}
              />
              <textarea
                cols={50}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Description"
                rows={8}
                value={description}
              />
              <input type="date" name="dueDate"
                min="2023-04-01" max="2025-12-31" value={dueDate} onChange={(e) => setDueDate(e.target.value)} required pattern="\d{4}-\d{2}-\d{2}"></input>
              <input disabled={!description || !title} type="submit" value="Create" />
            </form>
          </div>
        </main>
      </div>
      <style jsx>{`
        .task {
          background: white;
          transition: box-shadow 0.1s ease-in;
        }

        .task:hover {
          box-shadow: 1px 1px 3px #aaa;
        }

        .task + .task {
          margin-top: 2rem;
        }

        .page {
          background: var(--geist-background);
          padding: 3rem;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        input[type='text'],
        textarea {
          width: 100%;
          padding: 0.5rem;
          margin: 0.5rem 0;
          border-radius: 0.25rem;
          border: 0.125rem solid rgba(0, 0, 0, 0.2);
        }

        input[type='submit'] {
          background: #ececec;
          border: 0;
          padding: 1rem 2rem;
        }

        input[type='submit']:hover {
          border: 0.25rem solid black;
        }

        input[type='submit']:focus {
          background: #5A5A5A;
          color: #f5f5f5;
        }
      `}</style>
    </Layout>
  )
}

export default TaskList
