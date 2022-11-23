import React, { useEffect, useState } from "react";
import Form from "./Form";
import style from './home.module.css';

const URL = "https://rest-api-without-db.herokuapp.com/users/";

const Home = () => {
    const [users, setUsers] = useState();
    const [error, setError] = useState();
    const [isLoading, setIsLoading] = useState(true);

    // Update
    const [selectedUser, setSelectedUser] = useState({username: '', email: ''});
    const [updateFlag, setUpdateFlag] = useState(false);
    const [selectedUserId, setSelectedUserId] = useState();

    const getAllUsers = () => {
        fetch(URL)
        .then((res) => {
            if(!res.ok){
                throw Error('fetching is not successful')
            }else{
                return res.json();
            }
        })
        .then((data) => {
            setUsers(data.users);
            console.log(data.users);
        })
        .catch((err) => {
            setError(err);
        })
        .finally(() => {
            setIsLoading(false);
        })
    }

    useEffect(() => {
        getAllUsers();
    },[])

    // Add User - POST method
    const handleAddUser = (user) => {
        fetch(URL, {
            method: "POST",
            headers: {"Content-Type" : "application/json"},
            body: JSON.stringify(user)
        })
        .then((res) => {
            if(res.status === 201){
                getAllUsers();
            }else{
                throw Error('Could not successful to add user')
            }
        })
        .catch((err) => {
            setError(err.message);
        })
    }

    // Delete user - DELETE method
    const handleDelete = (id) => {
        fetch(URL + `/${id}` , {
            method: "DELETE"
        })
        .then((res) => {
            if(!res.ok){
                throw Error('Deleteing is not successful')
            }else{
                getAllUsers();
            }
        })
        .catch((err) => {
            setError(err.message);
        })
    }

    // Edit user
    const handleEdit = (id) => {
        setSelectedUserId(id);
        setUpdateFlag(true);
        const filteredData = users.filter((user) => user.id === id);
        setSelectedUser({
            username: filteredData[0].username,
            email: filteredData[0].email
        })
    }

    // Update
    const handleUpdate = (user) => {
        fetch(URL + `/${selectedUserId}`, {
            method: "PUt",
            headers: {"Content-Type" : "application/json"},
            body: JSON.stringify(user)
        })
        .then((res) => {
            if(!res.ok){
                throw Error('failed to update')
            }else{
                getAllUsers();
                setUpdateFlag(false)
            }
        })
        .catch((err) => {
            setError(err.message);
        })
    }

    return (
        <div className={style.home}>
            <h1 className={style.heading}>User Management App</h1>
            {updateFlag ? <Form handleSubmitData={handleUpdate} selectedUser={selectedUser} btnText="Update User"/> : <Form handleSubmitData={handleAddUser} btnText="Add User"/>}

            {error && <h3 className={style.heading}>{error}</h3>}
            {isLoading && <h3 className={style.heading}>Data is loading...</h3>}
            {users && users.map((user) => {
                const {id, username, email} = user;
                return (
                    <article key={id} className={style.card}>
                        <div>
                            <h3>Name : {username}</h3>
                            <p>Email : {email}</p>
                        </div>
                        <div>
                            <button onClick={() => {handleEdit(id)}}>Edit</button>
                            <button onClick={() => {handleDelete(id)}}>Delete</button>
                        </div>
                    </article>
                )
            })}
        </div>
    )
}

export default Home;