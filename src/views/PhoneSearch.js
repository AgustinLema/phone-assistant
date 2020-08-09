import React, { useState, useEffect } from 'react'

import { getFilterablePhoneInfo } from '../services/phoneDatasetAPI'

import { Paper } from '@material-ui/core'

import FilteredResults from '../components/FilteredResults'


export default props => {
    const [dataset, setDataset] = useState([]);
    const [filteredData, setFilteredData] = useState([]);

    const loadFilterableData = async () => {
        const dataset = await getFilterablePhoneInfo();
        setDataset(dataset);
    }

    useEffect(() => {
        loadFilterableData();
    }, []);

    useEffect(() => {
        if (!props.searchText || !dataset) {
            return;
        }
        const searchText = props.searchText.toUpperCase();

        const _filteredData = dataset.filter(item => {
            const label = `${item['Marca']} ${item['Modelo']}`.toUpperCase();
            return label.includes(searchText);
        });

        setFilteredData(_filteredData);
    }, [dataset, props.searchText]);

    return (
        <React.Fragment>
            <h2>Phones matching "{props.searchText}"</h2>
            <Paper>
                <FilteredResults filteredData={filteredData} />
            </Paper>
        </React.Fragment>
    )
}