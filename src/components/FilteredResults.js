import React from 'react'
import { Typography } from '@material-ui/core';

export default props => {
    const results = props.filteredData && props.filteredData.map(item => `${item.Marca} ${item.Modelo}`);
    const uniqueResults = [...new Set(results)]
    return (
        <div>
            <Typography variant="h4" >Modelos encontrados ({props.filteredData.length})</Typography>
            <ul style={{overflow: "auto", maxHeight: "500px"}}>
                {/* {props.filteredData} */}
                {/* {uniqueResults && uniqueResults.slice(0, 10).map(item => <li key={item}>{item}</li>)} */}
                {uniqueResults && uniqueResults.map(item => <React.Fragment key={item}> {item} <br /></React.Fragment>)}
            </ul>
        </div>
    )
}
