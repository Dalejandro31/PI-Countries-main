const {Activity, Country} = require('../db')


const STATUS_OK =200;
const STATUS_CREATED = 201;
const STATUS_ERROR=404;



async function getActivity(req, res){
    try {
        const allActivities = await Activity.findAll({
            include: {
                model: Country,
                attributes: ['name'],
            }
        });
        if(!allActivities.length) 
        res
        .status(STATUS_ERROR).json({message:'no hay actividades en la BD'})
        else 
        res
        .status(STATUS_OK).json(allActivities);
    } catch (error) {
        res
        .status(STATUS_ERROR).json({message:'error al obtener actividades'});
    }
}

async function postActivity(req, res){
    const {name, difficulty, duration, season, country} = req.body;

    try {
        if(!name || !difficulty || !season ){
            return res
            .status(STATUS_ERROR)
            .json({message: 'the require information is missing'})
        }

        const existingActivity = await Activity.findOne({
            where: {name : name}
        });

        if(existingActivity){
            const existingCountry = await Country.findOne({
                where: {name : country}
            })
            const isCountry = await existingActivity.hasCountry(existingCountry);

            if(isCountry){
                return res
                .status(STATUS_ERROR)
                .json({message: 'la actividad ya existe'})
            }
            await existingActivity.addCountry(existingCountry);
            return res 
            .status(STATUS_OK)
            .json({message: 'la actividad se ha añadido correctamente'})
        }

        const newActivity= await Activity.create({
            name,
            difficulty,
            duration,
            season,
        });

        if(country){
            console.log(':::::::::::::::',newActivity);
            let countries= await Country.findAll({where:{name:country}})
            await newActivity.addCountry(countries);
        }
        res
        .status(STATUS_CREATED).json(newActivity);
    } catch (error) {   
        res.status(STATUS_ERROR).json({message: 'Activity not created'});
    }
}

module.exports={
    postActivity,
    getActivity,
}
