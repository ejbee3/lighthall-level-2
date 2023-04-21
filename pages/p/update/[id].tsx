import React, { useState } from 'react';
import Layout from '../../../components/Layout';
import Router from 'next/router';
import prisma from '../../../lib/prisma';
import { GetServerSideProps } from 'next';
import { TaskProps } from '../../../components/Task';

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
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
        const body = { title, description, dueDate, isInProgress, isCompleted }
        await fetch(`/api/update/${props.id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body)
        });
        await Router.push('/');
    }

    async function deleteTask(id: string): Promise<void> {
        await fetch(`/api/delete/${id}`, {
            method: 'DELETE',
        });
        Router.push('/');
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
                        min={findYesterday(new Date())} max="2025-12-31" value={dueDate} onChange={(e) => setDueDate(e.target.value)} required pattern="\d{4}-\d{2}-\d{2}"></input>
                    <input type='checkbox' onChange={(e) => setIsInProgress(e.target.checked)} name='inProgress'></input>
                    <label htmlFor='inProgress'>Is in progress?</label>
                    <input type='checkbox' onChange={(e) => setIsCompleted(e.target.checked)} name='completed'></input>
                    <label htmlFor='completed'>Is task completed?</label>
                    <input disabled={!description || !title} type="submit" value="Update" />
                    <a className="back" href="#" onClick={() => Router.push('/')}>or Cancel</a>
                    <button onClick={() => deleteTask(props.id)}>Delete</button>
                </form>
            </div>
            <style jsx>{`
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

        .back {
          margin-left: 1rem;
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
    );
};

export default UpdateTask;