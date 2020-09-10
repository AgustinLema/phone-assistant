const BACKEND_URL = "http://828b5cf9a773.ngrok.io"
// http://192.168.0.237:5000

export const getFilterablePhoneInfo = async () => {
    // const delay = ms => new Promise(res => setTimeout(res, ms))
    // await delay(0)
    // return dataset;
    const response = await fetch(`${BACKEND_URL}/phone-data`);
    console.log("Response", response)
    const jsonResponse = await response.json();
    console.log(jsonResponse)
    return jsonResponse;
}

export const getPhoneDetails = async id => {
    // return dataset[id];
    const response = await fetch(`${BACKEND_URL}/phone-data/${id}`);
    console.log("Response", response)
    const jsonResponse = await response.json();
    console.log(jsonResponse)
    return jsonResponse;
}

export const getPhonePriceSummary = async id => {
    // return dataset[id];
    const response = await fetch(`${BACKEND_URL}/phone-data/${id}/price-summary`);
    console.log("Response", response)
    const jsonResponse = await response.json();
    console.log(jsonResponse)
    return jsonResponse;
}

// export const getPhoneDetailsByName = async name => {
//     const response = await fetch(`http://192.168.0.237:5000/phone-data/${name}`);
//     console.log("Response", response)
//     const jsonResponse = await response.json();
//     console.log(jsonResponse)
//     return jsonResponse;
// }
