import React from "react"
import { GetStaticProps } from "next"
import Layout from "../components/Layout"
import Task, { TaskProps } from "../components/Task"
import prisma from '../lib/prisma';

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
    props: { list },
    revalidate: 10,
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
      `}</style>
    </Layout>
  )
}

export default TaskList
