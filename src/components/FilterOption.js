import React from 'react'
import { ButtonBase, makeStyles } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
    container: {
        border: "1px solid black",
        padding: "10px",
        '&:hover': {
            backgroundColor: "lightblue",
        }
    },
    containerSelected: {
        backgroundColor: "dodgerblue",
        '&:hover': {
            backgroundColor: "blue",
        }
    }
}));

// TODO: Improve style, maybe replace with an horizontal bar showing min, max and where median is sitting.
export default props => {
    const classes = useStyles();

    return (
        <ButtonBase
            className={`${classes.container} ${props.selected && classes.containerSelected}`}
            onClick={props.handleClick}
            name={props.name}
        >
            <div>
                <h3>{props.info.label}</h3>
                <p>Cantidad: {props.info.count}</p>
                <p>Min ${props.info.minPrice}</p>
                <p>Max ${props.info.maxPrice}</p>
                <p>Media ${props.info.medianPrice}</p>
                <p>Promedio ${Math.floor(props.info.totalPrice / props.info.priceCount)}</p>
            </div>
        </ButtonBase>
    )
}
