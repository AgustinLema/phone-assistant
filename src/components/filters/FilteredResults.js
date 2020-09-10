import React, { useState } from 'react'
import { Link } from "@reach/router";


import { Typography, Grid, Button } from '@material-ui/core';
import PhoneCard from '../PhoneCard';

export default props => {
    const [visibleCount, setVisibleCount] = useState(props.visibleCount || 10);
    const showMoreCount = props.showMoreCount || 10;

    const results = props.filteredData || []
    const sortBy = props.sortBy || "sold_quantity"
    const sortAsc = props.sortAsc || false; 
    const sortedResults = results.sort((a, b) => ((a[sortBy] || 0) - (b[sortBy] || 0)) * (sortAsc ? 1 : -1));
    const displayedResults = sortedResults.slice(0, visibleCount);

    if (props.loading) {
        return <div><Typography variant="h4" >Cargando...</Typography></div>
    }
    return (
        <div>
            <Typography variant="h4" >Modelos encontrados ({sortedResults.length})</Typography>
            <Grid container spacing={2}>
                {displayedResults.map(phone => (
                    <Grid item key={phone["unique_name"]}                    >
                        <Link
                            to={`/details/${phone.phone_id}`}
                        >
                            <PhoneCard
                                model={phone.Modelo}
                                brand={phone.Marca}
                                ram={phone.RAM}
                                internalStorage={phone["Almacenamiento Interno"]}
                                price={Math.round(phone.prices.mean)}
                            />
                        </Link>
                    </Grid>
                ))}
            </Grid>
            <Button
                variant="contained"
                color="primary"
                style={{
                    margin: "10px auto",
                    display: sortedResults && visibleCount < sortedResults.length ? "block" : "none"
                }}
                onClick={() => setVisibleCount(count => count + showMoreCount)}
            >
                Mostrar más
            </Button>
        </div>
    )
}
