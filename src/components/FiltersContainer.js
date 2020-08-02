import React, { useState } from 'react'
import { Grid, Paper } from '@material-ui/core'
import FilterOptionList from './FilterOptionList'
import FilteredResults from './FilteredResults'

import dataset from '../dataset/dataset.json'

const getUniqueFields = objs => {
    const keys = objs.map(obj => Object.keys(obj)).flat();
    const filteredKeys = keys.filter(k => k !== "Modelo");
    return [...new Set(filteredKeys)]
}

const getUniqueOptions = (objs, field) => {
    let options = {};
    objs.forEach(obj => {
        options[obj[field]] = options[obj[field]] ? options[obj[field]] + 1 : 1
    });

    const optionList = Object.keys(options).map(k => [k, options[k]]);
    const sortedOptions = optionList.sort((a, b) => b[1] - a[1]).map(opt => opt[0]);
    return sortedOptions;
}

const style = {
    Paper: {
        padding: 20,
        marginTop: 10,
        marginBotton: 10,
    }
};

const filterCategories = getUniqueFields(dataset);
const filterCategoryOptions = filterCategories.reduce((obj, category) => {
    obj[category] = getUniqueOptions(dataset, category);
    return obj;
}, {})

console.log("categories", filterCategories)
console.log("categoryOptions", filterCategoryOptions)

export default props => {
    // useEffect(() => { TODO: Move global variables out of component into the component with an instance variable with useRef()

    // }, []);

    const [filters, setFilters] = useState({});


    const [filteredData, setFilteredData] = useState(dataset);

    const updateFilter = (filterType, selected) => {
        const newFilters = {
            ...filters,
            [filterType]: filters[filterType] !== selected ? selected : null
        };

        setFilters(newFilters);
        setFilteredData(
            dataset.filter(item =>
                Object.keys(newFilters).filter(k => newFilters[k] !== null).every(filterType => item[filterType] === newFilters[filterType])
            )
        )
    }

    return (
        <Grid container>
            <Grid item sm style={{ maxHeight: "calc(100vh - 160px)", overflow: "auto", padding: "0px 70px" }}>
                {/* {["Marca"].map(field => */}
                {filterCategories.map(field =>
                    <FilterOptionList
                        key={field}
                        setFilter={selected => updateFilter(field, selected)}
                        category={field}
                        dataset={dataset}
                        filters={filters}
                    />
                )}
            </Grid>
            <Grid item>
                <Paper style={style.Paper}>
                    <FilteredResults filteredData={filteredData} />
                </Paper>
            </Grid>
        </Grid>
    )
}
