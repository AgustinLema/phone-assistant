import React, { useState, useEffect } from 'react'

import { getPhoneDetails } from '../services/phoneDatasetAPI'

import { TableContainer, Paper, Table, TableBody, TableRow, TableCell } from '@material-ui/core'

import { makeStyles } from '@material-ui/core'

const useStyle = makeStyles({
    container: {
        maxWidth: "600px",
        margin: "30px auto",
    },
    field: {
        fontSize: 16,
        fontWeight: "bold",
        padding: '6px 12px',
        fontFamily: [
            '-apple-system',
            'BlinkMacSystemFont',
            '"Segoe UI"',
            'Roboto',
            '"Helvetica Neue"',
            'Arial',
            'sans-serif',
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"',
        ].join(','),
    }
});

export default props => {
    const classes = useStyle();
    const [phoneData, setPhoneData] = useState({});
    const { phoneID } = props;
    useEffect(() => { loadPhoneData(phoneID) }, [phoneID]);

    const loadPhoneData = async (phoneID) => {
        console.log("Loading from service");
        setPhoneData({ model: "sample" })
        const phoneDetails = await getPhoneDetails(phoneID);
        setPhoneData(phoneDetails);
    }

    return (
        <TableContainer component={Paper} className={classes.container}>
            <Table>
                <TableBody>

                    {Object.keys(phoneData).map(attr => (
                        <TableRow key={attr}>
                            <TableCell component="th" scope="row">

                                <label className={classes.field}>{attr}</label>
                            </TableCell>
                            <TableCell align="right">
                                <label className={classes.value}>{phoneData[attr]}</label>

                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer >
    )
}