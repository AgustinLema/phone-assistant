import React from 'react'
import { Paper, Tab, Tabs } from '@material-ui/core'

export default props => {
    return (
        <Paper style={{textAlign: "center", backgroundColor: "lightgray", padding: 10}}>
                <span>© 2020 Phone Asistant - Desarrollador: </span>
                <a href="mailto:agustinnlema@gmail.com">agustinnlema@gmail.com</a>
                <span> - </span>
                <a href="https://github.com/AgustinLema">https://github.com/AgustinLema</a>
        </Paper>
    )
}