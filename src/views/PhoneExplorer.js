import React from 'react'

import { Grid, Paper } from '@material-ui/core'
// import TestComponent from '../components/TestComponent'
import FiltersContainer from '../components/FiltersContainer'


export default props => {
    const style = {
        Paper: {
            paddingRight: 10,
            marginTop: 10,
            marginBotton: 10,
        }
    };
    return (
        <Grid container>
            <Grid item sm>
                {/* <Paper style={style.Paper}>
                    <TestComponent />
                </Paper> */}
                <Paper style={style.Paper}>
                    <FiltersContainer />
                </Paper>
            </Grid>
            {/* <Grid item sm>
                <Paper style={style.Paper}>
                Right pane
                </Paper>
            </Grid> */}
        </Grid>
    )
}