import React, {useState} from 'react';
import Layout from '../../../components/Layout';
import Router from 'next/router';
import prisma from '../../../lib/prisma';
import {GetServerSideProps} from 'next';
import {TaskProps} from '../../../components/Task';

export const getServerSideProps: GetServerSideProps = async ({params}) => {
    const task = await prisma.task.findUnique({
        where: {
            id: String(params?.id),
        },
    });
    return {
        props: task,
    };
};


const UpdateTask: React.FC<TaskProps> = (props) => {
    const [title, setTitle] = useState(props.title)
    const [description, setDescription] = useState(props.description)
    const [dueDate, setDueDate] = useState(props.dueDate)
    const [isInProgress, setIsInProgress] = useState(props.isInProgress)
    const [isCompleted, setIsCompleted] = useState(props.isCompleted)

    const submitUpdate = async (e: React.SyntheticEvent) => {
        e.preventDefault()
        const body = {title, description, dueDate, isInProgress, isCompleted}
        await fetch(`/api/update/${props.id}`, {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(body)
        });
        await Router.push('/tasks');
    }

    async function deleteTask(id: string): Promise<void> {
        await fetch(`/api/delete/${id}`, {
            method: 'DELETE',
        });
        Router.push('/tasks');
    }


    function findYesterday(today: Date): string {
        const [yr, mo, d] = [today.getFullYear(), today.getMonth() + 1, today.getDate() - 1]
        const formatForMinDate = (x: number) => {
            let strX = x.toString()
            return strX.length === 1 ? '0' + strX : strX
        }
        return `${yr}-${formatForMinDate(mo)}-${formatForMinDate(d)}`
    }

    return (
        <Layout>
            <div>
                <form onSubmit={submitUpdate}>
                    <div><input
                        autoFocus
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Title"
                        type="text"
                        value={title}
                        className={"input input-bordered my-2"}
                    /></div>
                    <div><textarea
                        cols={50}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Description"
                        rows={8}
                        value={description}
                        className={"textarea textarea-bordered my-2"}
                    /></div>
                    <div><input type="date" name="dueDate"
                                min={findYesterday(new Date())} max="2025-12-31" value={dueDate}
                                onChange={(e) => setDueDate(e.target.value)} required
                                pattern="\d{4}-\d{2}-\d{2}"
                                className={"input input-bordered my-2"}></input></div>
                    <div className={"flex"}><input className={"checkbox"} type='checkbox'
                                onChange={(e) => setIsInProgress(e.target.checked)}
                                name='inProgress'></input>
                        <label className={"label"} htmlFor='inProgress'>Is in progress?</label></div>
                    <div className={"flex"}><input className={"checkbox"} type='checkbox'
                                onChange={(e) => setIsCompleted(e.target.checked)}
                                name='completed'></input>
                        <label className={"label"} htmlFor='completed'>Is task completed?</label></div>
                    <div>
                        <a className="back btn btn-ghost mx-2" href="#" onClick={() => Router.push('/tasks')}>Cancel</a>
                        <input className={"btn btn-primary mx-2"} disabled={!description || !title} type="submit"
                               value="Update"/>
                    </div>
                    <div>
                        <button onClick={() => deleteTask(props.id)}>Delete</button>
                    </div>
                </form>
            </div>
        </Layout>
    );
};

export default UpdateTask;
