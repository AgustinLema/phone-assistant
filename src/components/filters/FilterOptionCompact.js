import React from 'react'
import { ButtonBase, makeStyles } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
    container: {
        border: "1px solid black",
        padding: "5px",
        '&:hover': {
            backgroundColor: "lightblue",
        }
    },
    containerSelected: {
        backgroundColor: "dodgerblue",
        '&:hover': {
            backgroundColor: "blue",
        }
    },
    title: {
        margin: 0,
    },
}));

// TODO: Improve style, maybe replace with an horizontal bar showing min, max and where median is sitting.
export default props => {
    const classes = useStyles();

    return (
        <ButtonBase
            className={`${classes.container} ${props.selected && classes.containerSelected}`}
            onClick={props.handleClick}
            name={props.name}
            style={{borderRadius: 4}}
        >
            <div>
                <h4 className={classes.title}>{props.info.label} ({props.info.count})</h4>
                <span>
                    Alrededor de: ${Math.floor(props.info.totalPrice / props.info.priceCount)}
                    <br />
                    ${props.info.minPrice} - ${props.info.maxPrice}
                </span>
            </div>
        </ButtonBase>
    )
}
