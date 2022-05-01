import React, {useContext, useEffect, useState} from 'react';
import {Context} from "../../index";
import {fetchUserRentHistory} from "../../api/TransactionApi";
import {Spinner} from "react-bootstrap";
import {Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";

const UserRentHistoryGrid = () => {
    const [loading, setLoading] = useState(true)
    const [history, setHistory] = useState({})
    const {userStore} = useContext(Context)

    useEffect(() => {
        fetchUserRentHistory(userStore.id)
            .then(data => setHistory(data))
            .finally(() => setLoading(false))
        if (!history.idUser) {
            setHistory(null)
        }
    }, [])

    if (loading) {
        return <Spinner animation={"grow"}/>
    }

    return (
        <TableContainer className={"mt-3"} component={Paper}>
            <Table sx={{minWidth: 650}} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell align="left">Rented auto</TableCell>
                        <TableCell align="left">Rent start day</TableCell>
                        <TableCell align="left">Rent finish day</TableCell>
                        <TableCell align="right">Status</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {history != null && history.map((rentRecord) => (
                        <TableRow
                            sx={{'&:last-child td, &:last-child th': {border: 0}}}
                        >
                            <TableCell align="left">{rentRecord.make} {rentRecord.model}, {rentRecord.type}</TableCell>
                            <TableCell align="left">{rentRecord.dateFrom}</TableCell>
                            <TableCell align="left">{rentRecord.dateTo}</TableCell>
                            <TableCell align="right">{rentRecord.active == 1 ? "In progress" : "Finished"}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default UserRentHistoryGrid;