import React, {useState} from "react"
import {GetServerSideProps} from "next"
import Layout from "../components/Layout"
import Task, {TaskProps} from "../components/Task"
import prisma from '../lib/prisma';
import Router from 'next/router';

export const getServerSideProps: GetServerSideProps = async () => {

    const list = await prisma.task.findMany({
        where: {created: true},
    })

    return {
        props: {list}
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
                <main>
                    <div className={"flex"}>
                        <label className={"label"} htmlFor="sort">Sort by: </label>
                        <select className={"select mx-2"} onChange={(e) => setSortMode(e.target.value)} name="sort">
                            <option value="dueDate">Due Date</option>
                            <option value="title">Title</option>
                            <option value="status">Status</option>
                        </select>
                        <div className={"divider-vertical"}></div>
                        <button onClick={() => Router.push('/create')} className={"btn btn-primary"}>new task</button>
                    </div>
                    {tasks.map((task) => (
                        <div key={task.id} className="task">
                            <Task task={task}/>
                        </div>
                    ))}
                </main>
            </div>

        </Layout>
    )
}

export default TaskList
