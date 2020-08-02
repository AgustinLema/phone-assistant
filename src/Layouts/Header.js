import React from 'react'
import { AppBar, Toolbar, Typography, IconButton, InputBase, makeStyles } from '@material-ui/core'
import HomeSharp from '@material-ui/icons/HomeSharp';
import SearchIcon from '@material-ui/icons/Search';

const useStyles = makeStyles(theme => ({
    title: {
        flexGrow: 1,
    },
    searchInput: {
        backgroundColor: 'white',
    },
}));

export default props => {
    const classes = useStyles();
    return (
        <AppBar position="static">
            <Toolbar>
                <IconButton
                    edge="start"
                    color="inherit"
                    aria-label="Go to Home"
                >
                    <HomeSharp />
                </IconButton>
                <Typography variant="h6" noWrap className={classes.title}>Phone Asistant</Typography>
                
                <div>
                    <SearchIcon/>
                    <InputBase
                        placeholder="Search…"
                        inputProps={{ 'aria-label': 'search' }}
                        className={classes.searchInput}
                    />
                </div>
            </Toolbar>
        </AppBar>
    )
}
