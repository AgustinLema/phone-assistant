export function smartComparator(a, b) {
    if ([a, b].some(param => ["kb", "mb", "gb"].some(unit => param.toLowerCase().includes(unit)))) {
        return compareBytesUnits(a, b);
    }

    [a, b] = getNormalizedVersionNumber(a, b);  // To handle versions like a.bb.xxx.c

    if (isNaN(a) || isNaN(b)) {
        return a > b ? 1 : a < b ? -1 : 0
    } else {
        return a - b;
    }
}

export function getNormalizedVersionNumber(a, b) {
    //Check if it's version
    const a_split = a.split(".");
    const b_split = b.split(".");
    const leastSignificant = Math.max(a_split.length, b_split.length) - 1;
    a = a_split.map((n, idx) => n * (10000) ** (leastSignificant - idx)).reduce((a, b) => a + b, 0)
    b = b_split.map((n, idx) => n * (10000) ** (leastSignificant - idx)).reduce((a, b) => a + b, 0)
    return [a, b]
}

export function compareBytesUnits(a, b) {
    return StringWithByteUnitToNumber(a) - StringWithByteUnitToNumber(b);
}

export function StringWithByteUnitToNumber(s) {
    let s_value = s.toLowerCase().replace("tb", "000gb")
        .replace("gb", "000mb")
        .replace("mb", "000kb")
        .replace("kb", "000")
        .replace(" ");
    return Number(s_value)
}

export function filterObjects(objects, filters) {
    // console.log("Will filter", objects);
    // console.log("Filters", filters)
    if (!filters) {
        return objects
    }
    const applicableFilterNames = Object.keys(filters).filter(filterCategory => filters[filterCategory] !== null);
    const filteredObjects = objects.filter(item =>
        applicableFilterNames.every(filterCategory => {
            const filterValue = filters[filterCategory];
            return Array.isArray(filterValue) ? filterValue.includes(item[filterCategory]) : item[filterCategory] === filterValue
        })
    );
    // console.log("Filter result", filteredObjects)
    return filteredObjects;
}

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

export function getNumberStatistics(numbers) {
    const total = numbers.reduce((a, b) => a + b, 0);
    return {
        minPrice: Math.min(numbers),
        maxPrice: Math.max(numbers),
        medianPrice: Math.median(numbers),
        averagePrice: Math.floor((total / numbers.length)),
    }
}

export function getObjectWithoutFields(obj, fields) {
    const newObj = {...obj};
    fields.forEach(field => delete newObj[field]);
    return newObj;
}