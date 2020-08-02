import React from 'react'
import { Button, Typography, makeStyles } from '@material-ui/core'

const useStyle = makeStyles({
    customButtonClass: {
        boxShadow: 'none',
        textTransform: 'none',
        fontSize: 16,
        padding: '6px 12px',
        border: '1px solid',
        lineHeight: 1.5,
        backgroundColor: '#007bff',
        borderColor: '#007bff',
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
    return (
        <React.Fragment>
            <Button variant="contained" color="primary">
                This is my button
            </Button>
            <Button variant="outlined" color="secondary">
                This is my button
            </Button>
            <Button variant="outlined" color="secondary" href='https://google.com.ar'>
                This is my button
            </Button>
            <Typography variant="h6" color="initial" align="center">This is my text</Typography>
            <Button className={classes.customButtonClass}>
              This is my personalized button
            </Button>
        </React.Fragment>
    )
}