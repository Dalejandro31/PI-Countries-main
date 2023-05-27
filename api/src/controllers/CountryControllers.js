const axios = require('axios');
const {Country,Activity} = require('../db');



async function getCountries (){
    const contriesAll = [];

    const url = await axios.get('https://rest-countries.up.railway.app/v2/all');
    await url.data.map((c)=> {
        let countryInfo = {
            id : c.alpha3Code,
            name: c.name,
            flag: c.flags.svg,
            capital: c.capital ? c.capital : 'no tiene capital',
            region: c.region,
            subregion: c.subregion ? c.subregion : 'no tiene subregion',
            area: c.area ? c.area : 'no tiene area',
            population: c.population,
        };
        contriesAll.push(countryInfo);
    });
    return[...new Set(contriesAll)];
}

async function getCountriesDB(){

    const infoApi = await getCountries();

    infoApi.forEach((info)=>{
        Country.findOrCreate({
            where: info,
        })
    });
    const getAll= await Country.findAll();
    return getAll;
}


module.exports = {
    getCountries,
    getCountriesDB,
}