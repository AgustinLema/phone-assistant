import React, { useState, useEffect } from 'react'

import { getFilterablePhoneInfo } from '../services/phoneDatasetAPI'

import { Grid, Paper } from '@material-ui/core'
import FilterOptionList from './FilterOptionList'
import FilteredResults from './FilteredResults'

const style = {
    Paper: {
        padding: 20,
        marginTop: 10,
        marginBotton: 10,
    }
};

const getUniqueFields = objs => {
    const keys = objs.map(obj => Object.keys(obj)).flat();
    const filteredKeys = keys.filter(k => k !== "Modelo");
    return [...new Set(filteredKeys)]
}


// const getUniqueOptions = (objs, field) => {
//     let options = {};
//     objs.forEach(obj => {
//         options[obj[field]] = options[obj[field]] ? options[obj[field]] + 1 : 1
//     });

//     const optionList = Object.keys(options).map(k => [k, options[k]]);
//     const sortedOptions = optionList.sort((a, b) => b[1] - a[1]).map(opt => opt[0]);
//     return sortedOptions;
// }

export default props => {
    const [datasetInfo, setDatasetInfo] = useState({
        dataset: [],
        filterCategories: [],
        filterCategoryOptions: [],
        filteredData: [],
    });
    const [filters, setFilters] = useState({});
    const { dataset, filterCategories, filteredData } = datasetInfo;

    useEffect(() => { loadFilterableData() }, []);

    const updateFilter = (filterType, selected) => {
        const newFilters = {
            ...filters,
            [filterType]: filters[filterType] !== selected ? selected : null
        };

        const filteredData = dataset.filter(item =>
            Object.keys(newFilters).filter(k => newFilters[k] !== null).every(filterType => item[filterType] === newFilters[filterType])
            )
        setDatasetInfo({...datasetInfo, filteredData})
        setFilters(newFilters);
    }

    const loadFilterableData = async () => {
        const dataset = await getFilterablePhoneInfo();
        const filterCategories = getUniqueFields(dataset);
        // const filterCategoryOptions = filterCategories.reduce((obj, category) => {
        //     obj[category] = getUniqueOptions(dataset, category);
        //     return obj;
        // }, {})
    
        console.log("categories", filterCategories);
        // console.log("categoryOptions", filterCategoryOptions)
        // setDatasetInfo({ dataset, filterCategories, filterCategoryOptions })
        setDatasetInfo({ dataset, filterCategories, filteredData: dataset });
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
