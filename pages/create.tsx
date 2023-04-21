import React, {useState} from 'react';
import Layout from '../components/Layout';
import Router from 'next/router';

const NewTask: React.FC = () => {
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [dueDate, setDueDate] = useState('')

    const submitData = async (e: React.SyntheticEvent) => {
        e.preventDefault()
        let userName = sessionStorage.getItem('username')
        try {
            const body = {title, description, dueDate, userName}
            await fetch('/api/task', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(body)
            })
            await Router.push('/tasks')
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

    return (
        <Layout>
            <h1 className={"text-2xl"} >New Task</h1>
            <div>
                <form onSubmit={submitData}>
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
                    <div>
                        <a className="back btn btn-ghost" href="#" onClick={() => Router.push('/tasks')}>Cancel</a>
                        <input className={"btn btn-primary cursor-pointer"} disabled={!description || !title}
                               type="submit" value="Create"/>
                    </div>
                </form>
            </div>
        </Layout>
    );
};

export default NewTask;
