import React from 'react'

import RangeSlider from '../RangeSlider';

import { smartComparator, filterObjects, getNumberStatistics } from '../../utils/filtersUtils'
import { Paper } from '@material-ui/core';

export default props => {
    // TODO: Don't allow applying changes if the resulting amount of phones is zero

    const options = [...new Set(props.dataset.map(obj => obj[props.category]).filter(option => option))].sort(smartComparator);
    const maxOptions = props.maxOptions || 13;
    let optionIndexes = [];
    if (options.length > maxOptions) {
        // Sample options to reduce clutter on screen
        const indexJump = options.length / maxOptions;
        for (let i = 0; i < maxOptions - 1; i += 1) {
            optionIndexes.push(Math.floor(i * indexJump))
        }
        optionIndexes.push(options.length - 1)
        // console.log(props.category, "Will show only indexes ", optionIndexes)
    }
    const shownOptions = optionIndexes.length > 0 ? optionIndexes.map(i => options[i]) : options;
    // console.log(shownOptions)
    // console.log("Filters is ", props.filters)
    let otherFilters = { ...props.filters };
    delete otherFilters[props.category];
    const preFilteredDataset = filterObjects(props.dataset, otherFilters);
    const filteredDataset = filterObjects(props.dataset, props.filters);
    // console.log("filtered dataset is ", filteredDataset)

    const preFilteredPriceData = getNumberStatistics(preFilteredDataset.map(item => item.prices.mean));
    const filteredPriceData = getNumberStatistics(filteredDataset.map(item => item.prices.mean));
    const priceDifference = Math.round(filteredPriceData.averagePrice - preFilteredPriceData.averagePrice);
    const priceDifferencePercentage = Math.round(((filteredPriceData.averagePrice / preFilteredPriceData.averagePrice) - 1) * 100)


    const handle_slider_change = indexes => {
        // console.log("New indexes", indexes)
        let [minIndex, maxIndex] = indexes;
        if (optionIndexes.length > 0) { // Transform visible options indexes to real ones
            minIndex = optionIndexes[minIndex];
            maxIndex = optionIndexes[maxIndex];
        }
        const new_selected_options = options.filter((_opt, idx) => idx >= minIndex && idx <= maxIndex)
        console.log("Selected options", new_selected_options)
        props.onChange && props.onChange(new_selected_options)
    }

    return (
        <Paper style={{ display: "flex", alignItems: "center", flexWrap: "wrap" }}>
            <div style={{ flexGrow: 1, padding: "0px 20px", minWidth: 400 }}>
                <RangeSlider
                    options={shownOptions}
                    onChange={handle_slider_change} //Receives change on indexes, calculates elements in range and calls onChange with category and values
                />
            </div>
            <div style={{ padding: "0px 5px", minWidth: 170 }}>
                <p>
                    Cantidad: {filteredDataset.length}
                </p>
                {/* <p>
                    Precio: ${preFilteredPriceData.averagePrice}
                </p> */}
                {filteredDataset.length ? (
                    <React.Fragment>
                        <p>
                            Precio: ${filteredDataset.length ? filteredPriceData.averagePrice : "-"}
                            {/* {`(${priceDifferencePercentage}%)`} */}
                        </p>
                        <p>
                            Diferencia: {priceDifference === 0 ? "-" : `$${priceDifference}`}
                            {priceDifferencePercentage === 0 ? "" : ` (${priceDifferencePercentage > 0 ? "+" : ""}${priceDifferencePercentage}%)`}
                        </p>
                    </React.Fragment>
                ) : <div style={{color: "red"}}><p>Sin resultados para</p><p>los filtros introducidos</p></div> }
            </div>
        </Paper>
    )
}
