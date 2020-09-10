import React, { useState, useEffect } from 'react'

import { getFilterablePhoneInfo } from '../services/phoneDatasetAPI'

import { Grid, Paper } from '@material-ui/core'
import FilteredResults from './filters/FilteredResults'
import Filter from './filters/Filter';
import { filterObjects } from '../utils/filtersUtils';


const filtersData = {
    "Sistema operativo": {
        label: "Sistema operativo",
        shortDescription: "El sistema base sobre el que funcionaran todas nuestras aplicaciones",
        longDescription: "Para que una aplicación se pueda instalar, tiene que ser compatible con el sistema operativo. Los más populares son iOS, diseñado especificamente para teléfonos marca Apple y Android que al ser más general, puede ser usado por diversas marcas.",
        filterType: "options",
    },
    "Marca": {
        label: "Marca",
        shortDescription: "Fabricante del dispositivo",
        longDescription: "Algunas marcas tienen más fama de hacer teléfonos en ciertos aspectos o de ser más baratos y caros. Aún así todas las marcas suelen tener productos buenos y malos.",
    },
    "Lanzamiento": {
        label: "Año de lanzamiento",
        filterType: "slider",
        shortDescription: "Cuándo fue lanzado el teléfono al mercado",
        longDescription: "Usualmente los teléfonos más viejos suelen ser más baratos, pero tienen peores características y prestaciones, sumado a que puede que no soporten actualizaciones a versiones nuevas",
    },
    "RAM": {
        label: "Memoria RAM",
        filterType: "slider",
        shortDescription: "Cantidad de memoria temporal que maneja el dispositivo para mantener aplicaciones funcionando",
        longDescription: "Todo lo que nuestro equipo tiene en funcionamiento requiere memoria. Si la memoria no es suficiente experimentaremos lentitud en pasar de una aplicación a otra porque tienen que cerrarse para liberar memoria. También podría significar que ciertas aplicaciones no puedan funcionar. A medida que pasan los años las aplicaciones se vuelven más y más demandantes de RAM y hace que teléfonos con poca RAM se vuelvan inusables.",
    },
    "Almacenamiento Interno": {
        label: "Espacio de almacenamiento interno",
        filterType: "slider",
        shortDescription: "Almacenamiento a largo plazo para guardar información, fotos y videos. Además las aplicaciones requerirán espacio para poder instalarse",
        longDescription: "El uso de las redes sociales significa que podemos estar recibiendo mucho contenido en poco tiempo. Si el espacio de almacenamiento es escaso, nos veremos obligados a tener que borrar fotos/videos o desinstalar aplicaciones frecuentemente.",
    },
    "Tamaño de pantalla": {
        label: "Tamaño de la pantalla",
        filterType: "slider",
        shortDescription: "Tamaño de la diagonal en pulgadas de la pantalla principal del teléfono",
        longDescription: "Pantallas más grandes implican que se puede ver mejor el contenido, pero también conllevan un mayor uso de batería y pueden aumentar considerablemente el tamaño y peso del teléfono.",
    },
    // "Resolucion de video de camara": {
    //     label: "Resolucion de la cámara al grabar videos",
    //     // filterType: "slider",
    //     shortDescription: "El sistema sobre el que funcionaran todas nuestras aplicaciones",
    //     longDescription: "Los más populares son iOS y Android. Para que una aplicación se pueda instalar, tiene que ser compatible con el sistema operativo.",
    // },
    // "Duración de batería": {
    //     label: "Duración de la batería",
    //     // filterType: "slider",
    //     shortDescription: "El sistema sobre el que funcionaran todas nuestras aplicaciones",
    //     longDescription: "Los más populares son iOS y Android. Para que una aplicación se pueda instalar, tiene que ser compatible con el sistema operativo.",
    // },
    // "Tipo de USB": {
    //     label: "Tipo de USB",
    //     // filterType: "slider",
    //     shortDescription: "El sistema sobre el que funcionaran todas nuestras aplicaciones",
    //     longDescription: "Los más populares son iOS y Android. Para que una aplicación se pueda instalar, tiene que ser compatible con el sistema operativo.",
    // },
    "Version del sistema operativo": {
        label: "Version del sistema operativo",
        filterType: "slider",
        shortDescription: "La máxima versión del sistema operativo que se puede instalar en el teléfono",
        longDescription: "Frecuentemente van lanzandose nuevas versiones de sistema operativo que trae nuevas características y mejoras. Algunos fabricantes se aseguran de que los teléfonos se mantengan actualizados mientras que otros se olvidan de los dispositivos más viejos. Un sistema operativo viejo puede significar que aplicaciones más nuevas no sean compatibles.",
    },
    // "Conector para auriculares 3.5mm": {
    //     label: "Conector para auriculares 3.5mm",
    //     shortDescription: "El sistema sobre el que funcionaran todas nuestras aplicaciones",
    //     longDescription: "Los más populares son iOS y Android. Para que una aplicación se pueda instalar, tiene que ser compatible con el sistema operativo.",
    // },
    // "Carga de bateria": {
    //     label: "Tipo de carga de batería",
    //     shortDescription: "El sistema sobre el que funcionaran todas nuestras aplicaciones",
    //     longDescription: "Los más populares son iOS y Android. Para que una aplicación se pueda instalar, tiene que ser compatible con el sistema operativo.",
    // },
    // "NFC": {
    //     label: "Soporte para NFC",
    //     shortDescription: "El sistema sobre el que funcionaran todas nuestras aplicaciones",
    //     longDescription: "Los más populares son iOS y Android. Para que una aplicación se pueda instalar, tiene que ser compatible con el sistema operativo.",
    // },
    // "Sensores": {
    //     label: "Sensores",
    //     shortDescription: "El sistema sobre el que funcionaran todas nuestras aplicaciones",
    //     longDescription: "Los más populares son iOS y Android. Para que una aplicación se pueda instalar, tiene que ser compatible con el sistema operativo.",
    // },
}

const style = {
    Paper: {
        padding: 20,
        marginTop: 10,
        marginBotton: 10,
    }
};

const getUniqueFields = objs => {
    const keys = objs.map(obj => Object.keys(obj)).flat();
    const filteredKeys = keys.filter(k => !["_id", "Modelo", "prices", "unique_name", "dataset_unique_name", "phone_id", "Precio", "Memoria Interna", "sold_quantity"].includes(k));
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
        const oldValue = filters[filterType];
        let newValue;
        if (oldValue === selected) {
            if (Array.isArray(selected)) {
                return
            }
            newValue = null; // Toggle for single value
        } else {
            newValue = selected;
        }


        const newFilters = {
            ...filters,
            [filterType]: newValue,
        };

        const filteredData = filterObjects(dataset, newFilters);
        setDatasetInfo({ ...datasetInfo, filteredData })
        setFilters(newFilters);
    }

    const loadFilterableData = async () => {
        const dataset = await getFilterablePhoneInfo();
        const filterCategories = getUniqueFields(dataset);
        // const filterCategoryOptions = filterCategories.reduce((obj, category) => {
        //     obj[category] = getUniqueOptions(dataset, category);
        //     return obj;
        // }, {})

        // console.log("categoryOptions", filterCategoryOptions)
        // setDatasetInfo({ dataset, filterCategories, filterCategoryOptions })
        setDatasetInfo({ dataset, filterCategories, filteredData: dataset });
    }

    return (
        <Grid container>
            <Grid item md style={{ padding: "0px 10px", width: "100%" }}>
                {/* {["Marca", "RAM"].map(field => */}
                {/* {filterCategories.map(field => */}
                {Object.keys(filtersData).map(field =>
                    <Filter
                        key={field}
                        onChange={selected => updateFilter(field, selected)}
                        category={field}
                        dataset={dataset}
                        filters={filters}
                        filterData={filtersData[field]}
                        filterType={["RAM", "Lanzamiento", "Almacenamiento Interno", "Tamaño de pantalla", "Version del sistema operativo"].includes(field) ? "slider" : "options"}
                    />
                )}
            </Grid>
            <Grid item md={4}>
                <Paper style={style.Paper}>
                    <FilteredResults filteredData={filteredData} />
                </Paper>
            </Grid>
        </Grid>
    )
}
