import React, {useContext, useEffect, useState} from 'react';
import {Context} from "../../index";
import {Spinner} from "react-bootstrap";
import {Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import {fetchAllTransaction, fetchUserTransactions} from "../../api/TransactionApi";

const UserTransactionsGrid = () => {
    const [loading, setLoading] = useState(true)
    const [transactions, setTransactions] = useState({})
    const {userStore} = useContext(Context)

    useEffect(() => {
        fetchAllTransaction()
            .then(data => setTransactions(data))
            .finally(() => setLoading(false))
        if (!transactions.idUser) {
            setTransactions(null)
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
                        <TableCell>User ID</TableCell>
                        <TableCell align="left">User login</TableCell>
                        <TableCell align="left">Transaction ID</TableCell>
                        <TableCell align="left">Amount</TableCell>
                        <TableCell align="right">Transaction date</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {transactions != null && transactions.map((transaction) => (
                        <TableRow
                            key={transaction.idUser}
                            sx={{'&:last-child td, &:last-child th': {border: 0}}}
                        >
                            <TableCell component="th" scope="row">
                                {transaction.idUser}
                            </TableCell>
                            <TableCell align="left">{transaction.login}</TableCell>
                            <TableCell align="left">{transaction.idTransaction} </TableCell>
                            <TableCell align="left">{transaction.amount}$</TableCell>
                            <TableCell align="right">{transaction.creationDate}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default UserTransactionsGrid;