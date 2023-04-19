import React from "react"
import { GetServerSideProps } from "next"
import ReactMarkdown from "react-markdown"
import Layout from "../../components/Layout"
import { TaskProps } from "../../components/Task"
import prisma from "../../lib/prisma"

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const task = await prisma.task.findUnique({
    where: { id: String(params?.id) },
    include: {
      author: {
        select: { name: true },
      }
    }
  })
  return {
    props: { task },
  }
}

const Task: React.FC<TaskProps> = (props) => {
  let title = props.title
  if (!props.isNew) {
    title = `${title} (Draft)`
  }

  return (
    <Layout>
      <div>
        <h2>{title}</h2>
        <p>By {props?.author?.name || "Unknown author"}</p>
        <ReactMarkdown children={props.description} />
      </div>
      <style jsx>{`
        .page {
          background: white;
          padding: 2rem;
        }

        .actions {
          margin-top: 2rem;
        }

        button {
          background: #ececec;
          border: 0;
          border-radius: 0.125rem;
          padding: 1rem 2rem;
        }

        button + button {
          margin-left: 1rem;
        }
      `}</style>
    </Layout>
  )
}

export default Task
