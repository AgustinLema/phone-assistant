import React, { useState, useEffect } from 'react'

import { Line } from 'react-chartjs-2';

import { getPhoneDetails, getPhonePriceSummary } from '../services/phoneDatasetAPI'

import SortableTable from '../components/SortableTable'

import TabContent from '../components/TabContent';
import AttributesTable from '../components/AttributesTable';
import { getObjectWithoutFields } from '../utils/filtersUtils';


export default props => {
    const [phoneData, setPhoneData] = useState({});
    const [phonePriceSummary, setPhonePriceSummary] = useState([]);
    const { phoneID } = props;
    useEffect(() => { loadPhoneData(phoneID); loadPhonePriceSummary(phoneID) }, [phoneID]);

    const loadPhoneData = async (phoneID) => {
        console.log("Loading from service");
        const phoneDetails = await getPhoneDetails(phoneID);
        // console.log("Phone details", phoneDetails)
        // const phoneDetailsWithLinks = await getPhoneDetailsByName(phoneDetails['unique_name'])
        // setPhoneData(phoneDetailsWithLinks);
        setPhoneData(phoneDetails);
    }

    const loadPhonePriceSummary = async phoneID => {
        const priceSummary = await getPhonePriceSummary(phoneID);
        setPhonePriceSummary(priceSummary);
    }

    const offersUniquePrices = (phoneData['offers'] || []).reduce((seen, offer) => {
        const offer_hash = `${offer['link']} ${offer['amount']}`
        if (offer_hash in seen) {
            let prev = seen[offer_hash]
            if (offer['date'] > prev['date']) {  // Keep newer
                seen[offer_hash] = offer;
            }
        } else {
            seen[offer_hash] = offer;
        }
        return seen
    }, {});

    const displayedPhoneData = getObjectWithoutFields(phoneData, ['offers', '_id', 'prices', 'sold_quantity', "phone_id", "dataset_unique_name", "Precio", "unique_name"])

    if (phoneData.prices) {
        displayedPhoneData["Precio Mínimo"] = `$ ${phoneData.prices.min}`;
        displayedPhoneData["Precio Medio"] = `$ ${phoneData.prices.median}`;
        displayedPhoneData["Precio Máximo"] = `$ ${phoneData.prices.max}`;
    }

    // const columnDefinitions = ["date", "eshop", "title", "amount", "currency", "sold_quantity"].map(name => ({
    const offersFields = [...new Set(Object.values(offersUniquePrices).reduce((fields, offer) => fields.concat(Object.keys(offer)), []))]
    console.log("Offers fields:", offersFields)
    const columnDefinitions = [
        { label: "Fecha", id: "date" },
        {
            label: "Título",
            id: "title",
            customComponent: props => <a href={props.row["link"]} target="_blank" rel="noopener noreferrer">
                {props.row[props.colDef["id"]]}
            </a>
        },
        { label: "Precio", id: "amount" },
    ]
    // const columnDefinitions = offersFields.filter(field => !(["_id"].includes(field))).map(name => ({
    //     label: name,
    //     id: name,
    //     customComponent: name === "title" ? props => (
    //         <a href={props.row["link"]} target="_blank" rel="noopener noreferrer">
    //             {props.row[props.colDef["id"]]}
    //         </a>
    //     ) : null,
    // }));
    const rowData = (offersUniquePrices && Object.keys(offersUniquePrices).map(k => offersUniquePrices[k])) || [];
    const nationalRowData = rowData.filter(offer => offer.currency === "ARS") || [];
    const internationalRowData = rowData.filter(offer => offer.currency !== "ARS") || [];

    const chartLabels = [...new Set(phonePriceSummary.map(price => price.end_of_week))];
    const currencies = [...new Set(phonePriceSummary.map(price => price.currency))]
    const priceHistoryByCurrency = phonePriceSummary.reduce((dict, data) => {
        dict[data.currency] = (dict[data.currency] || []).concat([data]);
        return dict;
    }, {});
    const chartColors = ["75,192,192", "87,179,107"]

    const chartData = {
        // labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        labels: chartLabels,
        datasets: currencies.map((curr, idx) => (
            {
                label: curr,
                fill: false,
                lineTension: 0.1,
                backgroundColor: `rgba(${chartColors[idx]},0.4)`,
                borderColor: `rgba(${chartColors[idx]},1)`,
                borderCapStyle: 'butt',
                borderDash: [],
                borderDashOffset: 0.0,
                borderJoinStyle: 'miter',
                pointBorderColor: `rgba(${chartColors[idx]},1)`,
                pointBackgroundColor: '#fff',
                pointBorderWidth: 1,
                pointHoverRadius: 5,
                pointHoverBackgroundColor: `rgba(${chartColors[idx]},1)`,
                pointHoverBorderColor: `rgba(220,220,220,1)`,
                pointHoverBorderWidth: 2,
                pointRadius: 3,
                pointHitRadius: 10,
                yAxisID: curr === "ARS" ? "left-y-axis" : 'right-y-axis',
                // data: [65, 59, 80, 81, 56, 55, 40]
                // data: curr in priceHistoryByCurrency && priceHistoryByCurrency[curr].map(price => price.mean) || console.log(curr)
                data: chartLabels.map(label => priceHistoryByCurrency[curr].filter(price => price.end_of_week === label).map(price => Math.round(price.mean))[0])
            }
        )),
    };

    const chartOptions = {
        spanGaps: true,
        // maintainAspectRatio: false,
        scales: {
            yAxes: [{
                id: 'left-y-axis',
                type: 'linear',
                position: 'left',
                ticks: {
                    // Include a dollar sign in the ticks
                    callback: function (value, index, values) {
                        return '$ ' + value;
                    },
                    precision: 0,
                }
            }, {
                id: 'right-y-axis',
                type: 'linear',
                position: 'right',
                ticks: {
                    // Include a dollar sign in the ticks
                    callback: function (value, index, values) {
                        return '$ ' + value + ' (USD)';
                    },
                    precision: 0,
                }
            }]
        }
    }

    return (
        <div style={{ margin: 20 }}>
            <h2 style={{ textAlign: "center" }}>{phoneData["unique_name"]}</h2>
            <AttributesTable
                data={displayedPhoneData}
                colNumber={window.innerWidth > 1800 ? 3 : window.innerWidth > 1100 ? 2 : 1}
                a={console.log("Wind screen",window.innerWidth)}
                maxColWidth={300}
            />
            <hr />
            <div style={{ width: "70%", minWidth: 300, margin: "auto" }}>
                <h3>Histórico de precios</h3>
                <Line
                    data={chartData}
                    options={chartOptions}
                    height={100}
                />
            </div>
            <hr />
            <div>
                <h3>Histórico de publicaciones</h3>
                <TabContent>
                    {
                        nationalRowData.length === 0 ? null : <SortableTable
                            columnDefinitions={columnDefinitions}
                            rowData={nationalRowData}
                            defaultSort="date"
                            sortDesc
                            tabLabel="Publicaciones nacionales"
                        />
                    }
                    {
                        internationalRowData.length === 0 ? null : <SortableTable
                            columnDefinitions={columnDefinitions}
                            rowData={internationalRowData}
                            defaultSort="date"
                            sortDesc
                            tabLabel="Publicaciones internacionales"
                        />
                    }
                </TabContent>
            </div>

            {/* Table with price weekly */}
            {/* <SortableTable
                columnDefinitions={phonePriceSummary && phonePriceSummary.length > 0 && Object.keys(phonePriceSummary[0]).filter(k => k !== '_id').map(k => ({ label: k, id: k }))}
                rowData={phonePriceSummary}
                defaultSort="amount"
            /> */}

        </div>
    )
}