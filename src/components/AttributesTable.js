import React from 'react'
import { TableContainer, TableCell, TableRow, TableBody, Paper, Table, makeStyles, Grid } from '@material-ui/core'


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
    const data = props.data || {};
    const colNumber = props.colNumber || 2;
    const maxColWidth = props.maxColWidth || 300;

    const columnsData = []
    const rowsPerPage = Math.ceil(Object.keys(data).length / colNumber);
    console.log("Rows per page", rowsPerPage)

    Object.keys(data).forEach((attr, idx) => {
        const col = Math.floor(idx / rowsPerPage);
        // console.log(idx, rowsPerPage, col, attr)
        columnsData[col] = {...columnsData[col], [attr]: data[attr]}
    });
    console.log("columns data", columnsData)


    function renderTable(data) {
        return <TableContainer component={Paper}>
            <Table>
                <TableBody>
                    {Object.keys(data).filter(attr => !['offers', '_id', 'prices'].includes(attr)).map(attr => (
                        <TableRow key={attr}>
                            <TableCell component="th" scope="row" style={{maxWidth: maxColWidth}}>
                                <label className={classes.field}>{attr}</label>
                            </TableCell>
                            <TableCell align="right" style={{maxWidth: maxColWidth}}>
                                <label className={classes.value}>{data[attr]}</label>
                            </TableCell>
                        </TableRow>
                    ))}
                    {/* <TableRow>
                            <TableCell component="th" scope="row">
                                <hr />

                            </TableCell>
                        </TableRow>
                        {'prices' in data && Object.keys(data['prices']).map(priceAttr => (
                            <TableRow key={priceAttr}>
                                <TableCell component="th" scope="row">
                                    <label className={classes.field}>Price - {priceAttr}</label>
                                </TableCell>
                                <TableCell align="right">
                                    <label className={classes.value}>{data['prices'][priceAttr]}</label>
                                </TableCell>
                            </TableRow>
                        ))} */}
                </TableBody>
            </Table>
        </TableContainer >
    }

    return (
        <Grid container justify="center">
            {columnsData.map((data, idx) => (
                <Grid item key={idx}>
                    {renderTable(data)}
                </Grid>
            ))}

        </Grid>
    )
}
