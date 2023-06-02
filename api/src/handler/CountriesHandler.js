const {Activity, Country} = require('../db')
const {getCountries, getCountriesDB} = require('../controllers/CountryControllers');
const {Op} = require('sequelize');


const STATUS_OK =200;
const STATUS_CREATED = 201;
const STATUS_ERROR=404;


async function getAll(req, res){
    try {
        const getCountry = await getCountriesDB();
        res
        .status(STATUS_OK).json(getCountry)
    } catch (error) {
        res
        .status(STATUS_ERROR).json({message:error});
    }
}

async function getAllCountries(req,res){
    const {name} = req.query;

    // const [allCountries] = await Country.findOrCreate({
    //     where: {},
    //     defaults: await getCountries(),
    // });

    const filterDB =  await Country.findAll({
        include: Activity,
    });

    if(name){
        try {
            let filterCountry= filterDB.filter((x)=>
            x.name.toLowerCase().includes(name.toLowerCase()));

            filterCountry.length > 0
                ? res
                .status(STATUS_OK).json(filterCountry)
                : res
                .status(STATUS_ERROR).json({message: 'Contry not excist'});
        } catch (error) {
            return res.status(STATUS_ERROR).json({message:error});
        }
    }else{
        try {
            // res.json(filterDB);
            res.json(filterDB.map(country => country.toJSON()));
        } catch (error) {
            res.status(STATUS_ERROR).json({message:error})
        }
    }
    
};

async function getId(req,res){
    const {id} = req.params;

    try {
        const getById= id.toUpperCase();
        const getCountry = await Country.findOne({
            where: {
                id: getById
            },
            include:Activity,
        });
        if(getCountry) return res.status(STATUS_OK).json(getCountry)
        else return res.status(STATUS_ERROR).send("no existe ese id para un pais")
    } catch (error) {
        res.status(STATUS_ERROR).json(error)
        
    }
}

module.exports={
    getAllCountries,
    getAll,
    getId,
}
