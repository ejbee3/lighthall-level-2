import React from "react"
import { GetStaticProps } from "next"
import Layout from "../components/Layout"
import Task, { TaskProps } from "../components/Task"
import prisma from '../lib/prisma';
import Router from 'next/router';

export const getStaticProps: GetStaticProps = async () => {
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



  return (
    <Layout>
      <div className="page">
        <h1>Tasks</h1>
        <main>
          <button onClick={() => Router.push('/create')}>new task</button>
          {props.list.map((task) => (
            <div key={task.id} className="task">
              <Task task={task} />
            </div>
          ))}
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
      `}</style>
    </Layout>
  )
}

export default TaskList
