import React from 'react'
import { Link } from "@reach/router";


import { Typography } from '@material-ui/core';

export default props => {
    const itemList = {}
    props.filteredData && props.filteredData.forEach(item => {
        const uniqueName = `${item.Marca} ${item.Modelo} (${item.RAM} - ${item["Almacenamiento Interno"]})`;
        itemList[uniqueName] = item;
    });

    return (
        <div>
            <Typography variant="h4" >Modelos encontrados ({Object.keys(itemList).length})</Typography>
            <ul style={{ overflow: "auto", maxHeight: "500px" }}>
                {/* {props.filteredData} */}
                {/* {uniqueResults && uniqueResults.slice(0, 10).map(item => <li key={item}>{item}</li>)} */}
                {itemList && Object.keys(itemList).map(itemUniqueName => (
                    <div key={itemUniqueName}                    >
                        <Link
                            to={`/details/${itemList[itemUniqueName].id}`}
                        >
                            {itemUniqueName}
                        </Link>
                    </div>
                ))}
            </ul>
        </div>
    )
}
