import dataset from './dataset/dataset.json'

export const getFilterablePhoneInfo = async () => {
    const delay = ms => new Promise(res => setTimeout(res, ms))
    await delay(0)
    return dataset;
}

export const getPhoneDetails = async id => {
    return dataset[id];
}

export const getPhoneDetailsByName = async name => {
    const response = await fetch(`http://localhost:5000/phone-data/${name}`);
    console.log("Response", response)
    const jsonResponse = await response.json();
    console.log(jsonResponse)
    return jsonResponse;
}
