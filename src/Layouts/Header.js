import React, { useState } from 'react'
import { Link, navigate } from "@reach/router";

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
    const [searchValue, setSearchValue] = useState("");

    return (
        <AppBar position="static">
            <Toolbar>
                <IconButton
                    edge="start"
                    color="inherit"
                    aria-label="Go to Home"
                    component={Link}
                    to={'/'}
                >
                    <HomeSharp />
                </IconButton>
                <Typography variant="h6" noWrap className={classes.title}>Phone Asistant</Typography>
                <div>
                    <Link to="details/1">details</Link>
                    <Link to="search">search</Link>
                    <Link to="admin">admin</Link>
                </div>

                <form onSubmit={event => {navigate(`/search/${searchValue}`); event.preventDefault()}}>
                    <SearchIcon />
                    <InputBase
                        placeholder="Search…"
                        value={searchValue}
                        onChange={event => setSearchValue(event.target.value)}
                        inputProps={{ 'aria-label': 'search' }}
                        className={classes.searchInput}
                    />
                </form>
            </Toolbar>
        </AppBar>
    )
}
