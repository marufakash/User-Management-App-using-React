import React, { useState } from "react";
import style from './home.module.css';

const Form = ({onAddUser, btnText}) => {
    const [users, setUsers] = useState({username: '', email: ''});
    const { username, email } = users;

    const handleChange = (event) => {
        setUsers((oldUsers) => {
            return {...oldUsers, [event.target.name]: event.target.value}
        })
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        onAddUser(users);
        setUsers({username: '', email: ''});
    }

    return (
        <div className={style.form}>
            <form action="" onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="username">User-name : </label>
                    <input type="text" value={username} onChange={handleChange} name="username" id="username" required />
                </div>
                <div>
                    <label htmlFor="email">Email : </label>
                    <input type="email" value={email} onChange={handleChange} name="email" id="email" required />
                </div>
                <div>
                    <button type="submit">{btnText}</button>
                </div>
            </form>
        </div>
    )
}

export default Form;