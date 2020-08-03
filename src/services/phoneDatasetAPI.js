import dataset from './dataset/dataset.json'

export const getFilterablePhoneInfo = async () => {
    const delay = ms => new Promise(res => setTimeout(res, ms))
    await delay(0)
    return dataset;
}

export const getPhoneDetails = async id => {
    return dataset[id];
}
