import React, { useState, useEffect } from 'react'

import { getFilterablePhoneInfo } from '../services/phoneDatasetAPI'

import { Paper } from '@material-ui/core'

import FilteredResults from '../components/filters/FilteredResults'


export default props => {
    const [dataset, setDataset] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [loading, setLoading] = useState(false);

    const loadFilterableData = async () => {
        setLoading(true);
        const dataset = await getFilterablePhoneInfo();
        setDataset(dataset);
        setLoading(false);
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
        <Paper style={{margin: "10px", minHeight: "50vh", padding: 10}}>
            <h2>Buscando teléfonos por: "{props.searchText}"</h2>
            <FilteredResults loading={loading} filteredData={filteredData} visibleCount={20}/>
        </Paper>
    )
}