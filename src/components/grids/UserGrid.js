import React, {useContext, useEffect, useState} from 'react';
import {Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import {fetchAllUsers} from "../../api/UserApi";
import {Button, Spinner} from "react-bootstrap";
import {Context} from "../../index";
import {makeAdmin, removeAdmin} from "../../api/AdminApi";

const UserGrid = () => {
    const [loading, setLoading] = useState(true)
    const [users, setUsers] = useState({})
    const {userStore} = useContext(Context)

    const handleMakeAdmin = (targetId) => {
        makeAdmin(userStore.id, targetId).then(data => setUsers(data)).catch(e => console.log(e.message()))
    }
    const handleRemoveAdmin = (targetId) => {
        removeAdmin(userStore.id, targetId).then(data => setUsers(data)).catch(e => console.log(e.message()))
    }

    useEffect(() => {
        fetchAllUsers().then(data => setUsers(data)).finally(() => setLoading(false))
    }, [])

    if (loading) {
        return <Spinner animation={"grow"}/>
    }

    return (
        <TableContainer className={"mt-3"} component={Paper}>
            <Table sx={{minWidth: 650}} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>User ID</TableCell>
                        <TableCell align="left">Username</TableCell>
                        <TableCell align="left">Full name</TableCell>
                        <TableCell align="left">Role</TableCell>
                        <TableCell align="right">Action</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {users.map((user) => (
                        <TableRow
                            key={user.id}
                            sx={{'&:last-child td, &:last-child th': {border: 0}}}
                        >
                            <TableCell component="th" scope="row">
                                {user.id}
                            </TableCell>
                            <TableCell align="left">{user.username}</TableCell>
                            <TableCell align="left">{user.name} {user.surname}</TableCell>
                            <TableCell align="left">{user.role}</TableCell>
                            {user.id == userStore.id
                                ?
                                <TableCell align="right"></TableCell>
                                :
                                <TableCell align="right">
                                    {user.role === 'admin'
                                        ?
                                        <Button onClick={() => handleRemoveAdmin(user.id)} variant={"outline-danger"}>Remove admin</Button>
                                        :
                                        <Button onClick={() => handleMakeAdmin(user.id)} variant={"outline-success"}>Make admin</Button>

                                    }
                                </TableCell>
                            }
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default UserGrid;