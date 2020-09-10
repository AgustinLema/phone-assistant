import React from 'react'
import { Card, CardContent, Typography } from '@material-ui/core'

export default props => {
    // Props: brand, model, memory, price, extra info?
    return <Card>
        <CardContent>
            <Typography>
                {props.brand}
            </Typography>
            <Typography variant="h5" component="h2">
                {props.model}
            </Typography>
            <Typography>
                RAM: {props.ram || "-"}
                <br />
                Almacenamiento: {props.internalStorage  || "-"}
            </Typography>
            <Typography>
                Alrededor de ${props.price}
            </Typography>
        </CardContent>
    </Card>
}
