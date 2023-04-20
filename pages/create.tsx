// pages/create.tsx

import React, { useState } from 'react';
import Layout from '../components/Layout';
import Router from 'next/router';

const NewTask: React.FC = () => {
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
            await Router.push('/')
        } catch (error) {
            console.error(error)
        }
    }

    function findYesterday(today: Date): string {
        const [yr, mo, d] = [today.getFullYear(), today.getMonth() + 1, today.getDate() - 1]
        const formatForMin = (x: number) => {
            let strX = x.toString()
            return strX.length === 1 ? '0' + strX : strX
        }
        return `${yr}-${formatForMin(mo)}-${formatForMin(d)}`
    }

    console.log(findYesterday(new Date()))

    return (
        <Layout>
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
                        min={findYesterday(new Date())} max="2025-12-31" value={dueDate} onChange={(e) => setDueDate(e.target.value)} required pattern="\d{4}-\d{2}-\d{2}"></input>
                    <input disabled={!description || !title} type="submit" value="Create" />
                    <a className="back" href="#" onClick={() => Router.push('/')}>or Cancel</a>
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

export default NewTask;