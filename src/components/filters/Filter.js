import React, { useState } from 'react'
import FilterSlider from './FilterSlider'
import FilterOptionList from './FilterOptionList'
import { Paper, Button } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import FilterOptions from './FilterOptions';


export default props => {
    const [expanded, setExpanded] = useState(false); // TODO: Rollback to false after testing
    const filterData = props.filterData || {};
    const title = filterData ? filterData.label : props.category;
    const shortDescription = filterData.shortDescription;
    const longDescription = filterData.longDescription;
    // const FilterComponent = filterData.filterType === "slider" ? FilterSlider : FilterOptionList;
    const FilterComponent = filterData.filterType === "slider" ? FilterSlider : FilterOptions;
    const ExpandIcon = expanded ? ExpandLessIcon : ExpandMoreIcon;
    const filteredValues = props.filters[props.category];
    let filteredText;
    if (filteredValues) {
        const filteredValuesDisplayed = getFilteredValuesDisplayed(filteredValues, filterData.filterType);
        filteredText = `Filtrado por: ${filteredValuesDisplayed}`
    }
    return (
        <Paper elevation={3} style={{ margin: "10px 0", padding: 5 }}>
            <h4 style={{ margin: 0 }}>{title}</h4>
            <div style={{ padding: "0 5px" }}>
                <p style={{margin: "5px 0"}}>{shortDescription}</p>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <span>
                        <ExpandIcon
                            onClick={() => setExpanded(expanded => !expanded)}
                        />
                        {filteredText}
                    </span>
                    <div>
                        <Button onClick={() => setExpanded(expanded => !expanded)} variant="outlined">
                            Filtrar
                        </Button>
                        {/* <Button variant="outlined">
                            Cambiar
                        </Button>
                        <Button variant="outlined">
                            Quitar filtro
                        </Button> */}
                    </div>
                </div>
                <div style={{ display: expanded ? '' : "none" }}>
                    <p style={{margin: "5px 0"}}>{longDescription}</p>
                    <FilterComponent
                        {...props}
                    />
                </div>

            </div>
        </Paper>
    )

    function getFilteredValuesDisplayed(values, filterType) {
        if (filterType === "slider") {
            return [values[0], values[values.length - 1]].join("-")
        } else {
            return values;
        }
    }
}
