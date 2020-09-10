import React, { useState } from 'react'
import { Link, navigate } from "@reach/router";

import { AppBar, Toolbar, Typography, IconButton, InputBase, makeStyles, ButtonBase, Hidden, Icon } from '@material-ui/core'

import HomeSharp from '@material-ui/icons/HomeSharp';
import SearchIcon from '@material-ui/icons/Search';

const useStyles = makeStyles(theme => ({
    title: {
        flexGrow: 1,
        justifyContent: "flex-start",
    },
    searchInput: {
        backgroundColor: 'white',
        padding: "0 5px",
    },
}));

export default props => {
    const classes = useStyles();
    const [searchValue, setSearchValue] = useState("");

    return (
        <AppBar position="static">
            <Toolbar>
                <ButtonBase className={classes.title} onClick={event => { navigate("/"); event.preventDefault() }}>
                    <Hidden xsDown>
                        <Icon
                            edge="start"
                            color="inherit"
                            aria-label="Go to Home"
                        >

                            <HomeSharp />
                        </Icon>
                    </Hidden>
                    <Typography variant="h6" noWrap>Phone Asistant</Typography>
                </ButtonBase>
                {/* <div>
                    <Link to="details/1">details</Link>
                    <Link to="search">search</Link>
                    <Link to="admin">admin</Link>
                </div> */}
                <div style={{ whiteSpace: "noWrap" }}>
                    <form onSubmit={event => { if (searchValue !== "") navigate(`/search/${searchValue}`); event.preventDefault() }}>
                        <InputBase
                            placeholder="Buscar teléfono..."
                            value={searchValue}
                            onChange={event => setSearchValue(event.target.value)}
                            inputProps={{ 'aria-label': 'Buscar teléfono', size: window.innerWidth < 600 ? 10 : 20 }}
                            className={classes.searchInput}
                        />
                        <IconButton
                            edge="start"
                            color="inherit"
                            aria-label="Go to Home"
                            type="submit"
                        >
                            <SearchIcon />
                        </IconButton>
                    </form>
                </div>
            </Toolbar>
        </AppBar>
    )
}
