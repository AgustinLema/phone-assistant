import React, { useState } from 'react'
import { Grid, Button, IconButton } from '@material-ui/core'
import FilterOption from './FilterOption'
import Clear from '@material-ui/icons/Clear';
import FilterOptionCompact from './FilterOptionCompact';
import { filterObjects } from '../../utils/filtersUtils';

Math.median = (values) => {
    if (values.length === 0) return 0;

    values.sort(function (a, b) {
        return a - b;
    });

    var half = Math.floor(values.length / 2);

    if (values.length % 2)
        return values[half];

    return (values[half - 1] + values[half]) / 2.0;
}

const getOptionData = (data, field) => {
    let optionData = {}
    console.log("Option data for ", field)
    data.forEach(obj => {
        const optionValue = obj[field];
        console.log("Option value: ", optionValue)
        if (!(optionValue in optionData)) {
            optionData[optionValue] = {
                label: optionValue,
                minPrice: Number.MAX_VALUE,
                maxPrice: -1,
                totalPrice: 0,
                count: 0,
                priceCount: 0,
            };
        }
        optionData[optionValue].count++;
        // const extractedPrice = obj["Precio"].match(/About (\d+) EUR/i);   # TODO: Deprecate, we use price from ml now?
        const extractedPrice = obj["prices"]["mean"]
        if (extractedPrice) {
            // const price = extractedPrice[1]
            const price = extractedPrice
            const intPrice = parseInt(price);
            optionData[optionValue].minPrice = Math.min(optionData[optionValue].minPrice, intPrice);
            optionData[optionValue].maxPrice = Math.max(optionData[optionValue].maxPrice, intPrice);
            optionData[optionValue].totalPrice += intPrice;
            optionData[optionValue].priceCount++;
            if (!("prices" in optionData[optionValue])) optionData[optionValue].prices = [];
            optionData[optionValue].prices.push(intPrice);
        }

    });
    Object.keys(optionData).forEach(optionValue => {
        if (optionData[optionValue].prices) {
            optionData[optionValue].medianPrice = Math.median(optionData[optionValue].prices);
        } else {
            optionData[optionValue].medianPrice = 0;
        }
    })
    return optionData;
}

const filterDataset = (dataset, filters, currentCategory) => {
    let otherFilters = { ...filters };
    delete otherFilters[currentCategory]
    return filterObjects(dataset, otherFilters);
}

const sortOptions = (optionData, attr, desc = true) => {
    return optionData && Object.keys(optionData).sort((a, b) => {
        a = optionData[a][attr];
        b = optionData[b][attr];
        const reverser = desc ? 1 : -1;
        if (!isNaN(a) && !isNaN(b)) {
            a = Number(a);
            b = Number(b);
            return (b - a) * reverser
        } else {
            return b.localeCompare(a) * reverser
        }
    });
}

export default props => {
    const [sortAttr, setSortAttr] = useState("count");
    const [sortOrderDesc, setSortOrderDesc] = useState(true);
    const [shownOptionsCount, setShownOptionsCount] = useState(10);
    const filteredDataset = filterDataset(props.dataset, props.filters, props.category);
    const optionData = getOptionData(filteredDataset, props.category);
    optionData && console.log("Sorting by", sortAttr, props.category);
    const sortedOptions = sortOptions(optionData, sortAttr, sortOrderDesc);

    const updateSortAttr = (attr) => {
        if (sortAttr === attr) {
            setSortOrderDesc(!sortOrderDesc);
        } else {
            setSortAttr(attr);
            setSortOrderDesc(true);
        }
    }

    // useEffect(() => setShownOptionsCount(10), [props.filters])

    return (
        <div>
            {/* <div style={{padding: 10}}>
                <span style={{fontWeight: "bold", marginRight: 10}}>Sort by</span>
                {["count", "minPrice", "maxPrice", "medianPrice", "label"].map(attr => (
                    <Button
                        key={attr}
                        onClick={event => updateSortAttr(attr)}
                        variant="outlined"
                        style={sortAttr === attr ? {backgroundColor: "dodgerblue",} : {}}
                    >
                        <span style={{visibility: sortAttr === attr ? "initial" : "hidden"}}>
                            {sortOrderDesc ? "▼" : "▲"}
                        </span>
                        {attr}
                    </Button>
                ))}
                <IconButton
                    edge="start"
                    color="secondary"
                    aria-label="Clear filter"
                    disabled = {props.filters[props.category] ? false : true}
                    onClick={() => {props.onChange(null)}}
                >
                    <Clear />
                </IconButton>
            </div> */}
            <h5 style={{ margin: "5px 0" }}>Opciones:</h5>
            <Grid container spacing={1} style={{ width: "100%", overflow: "auto", maxHeight: "500px" }}>
                {sortedOptions && sortedOptions.slice(0, shownOptionsCount).map(option =>
                    optionData[option] && optionData[option].label && <Grid item key={option}>
                        <FilterOptionCompact
                            info={optionData[option]}
                            handleClick={() => props.onChange(option)}
                            name={option}
                            selected={props.filters[props.category] === option}
                        />
                    </Grid>
                )}
            </Grid>
            <Button
                variant="contained"
                color="primary"
                style={{
                    margin: "10px auto",
                    display: sortedOptions && shownOptionsCount < sortedOptions.length ? "block" : "none"
                }}
                onClick={() => setShownOptionsCount(count => count + 10)}
            >
                Mostrar más
            </Button>
        </div>
    )
}
