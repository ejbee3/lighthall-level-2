import React, {useState} from 'react';
import Router from 'next/router';

const Login: React.FC = () => {
    const [name, setName] = useState('')


    const createUser = (e: React.SyntheticEvent) => {
        e.preventDefault()
        sessionStorage.setItem("username", name)
        Router.push('/tasks')
    }


    return (
        <div>
            <form onSubmit={createUser}>
                <label className={"label"} htmlFor='new-user'><b>Login</b></label>
                <input className={"input input-bordered"} type='text' placeholder='enter new user' name='new-user'
                       onChange={(e) => setName(e.target.value)} value={name} required></input>
                <input className={"btn btn-primary mx-2"} disabled={!name} type="submit" value="Login"/></form>
        </div>
    )
}


export default Login;
