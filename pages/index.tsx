import React, { useState } from 'react';
import Router from 'next/router';

const Login: React.FC = () => {
  const [name, setName] = useState('')


  const createUser = (e: React.SyntheticEvent) => {
    e.preventDefault()
    sessionStorage.setItem("username", name)
    Router.push('/tasks')
  }




  return (
    <div><form onSubmit={createUser}><label htmlFor='new-user'><b>New user</b></label>
      <input type='text' placeholder='enter new user' name='new-user' onChange={(e) => setName(e.target.value)} value={name} required></input>
      <input disabled={!name} type="submit" value="Create" /></form></div>
  )
}






export default Login;
