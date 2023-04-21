import React, {useState} from "react"
import { GetServerSideProps, GetStaticProps } from "next"
import Layout from "../components/Layout"
import Task, { TaskProps } from "../components/Task"
import prisma from '../lib/prisma';
import Router from 'next/router';

export const getStaticProps: GetStaticProps = async () => {
  const list = await prisma.task.findMany({
    // where: { isNew: true },

  })

  return {
    props: { list }
  }
}


type Props = {
  list: TaskProps[]
}

const TaskList: React.FC<Props> = (props) => {

  const [tasks, setTasks] = useState(props.list);
  const [sortMode, setSortMode] = useState('dueDate');

    switch (sortMode) {
        case 'dueDate':
            tasks.sort((a, b) => {
                // sort by due date
                if (a.dueDate < b.dueDate) {
                    return -1;
                }
            })
            break;
        case 'title':
            tasks.sort((a, b) => {
                // sort alphabetically
                if (a.title < b.title) {
                    return -1;
                }
            })
            break;
        case 'status':
            tasks.sort((a, b) => {
                // sort by status
                const statusA = a.isNew ? "New" : a.isInProgress ? "In progress" : a.isCompleted ? "Completed" : "";
                const statusB = b.isNew ? "New" : b.isInProgress ? "In progress" : b.isCompleted ? "Completed" : "";

                if (statusA > statusB) {
                    return -1;
                }
            })
            break;
    }

  return (
    <Layout>
      <div className="page">
        <h1>Tasks</h1>
        <main>
            <label htmlFor="sort">Sort by: </label>
            <select onChange={(e) => setSortMode(e.target.value)} name="sort">
                <option value="dueDate">Due Date</option>
                <option value="title">Title</option>
                <option value="status">Status</option>
            </select>
          <button onClick={() => Router.push('/create')}>new task</button>
          {tasks.map((task) => (
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
