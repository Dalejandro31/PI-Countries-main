import axios from 'axios'
import {
    GET_ALL_COUNTRIES,
    GET_COUNTRY_NAME,
    GET_COUNTRY_DETAIL,
    GET_ACTIVITIES,
    GET_FILTER_ACTIVITY,
    GET_FILTER_CONTINENT,
    GET_ORDER_AZ,
    GET_ORDER_ZA,
    GET_ORDER_POPULATION_ASC,
    GET_ORDER_POPULATION_DESC,
    POST_ACTIVITY
} from './actions-type';


//ACTIONS COUNTRIES ----------------->>>

export const getAllCountries = () =>{
    return async(dispatch) => {
        await axios.get('http://localhost:3001/countries/')
        .then((res) => res.data)
        .then((data) => { 
            console.log('payload:', data)
            dispatch({type: GET_ALL_COUNTRIES, payload: data})})
    }
}

export const getCountryName = (name) => {
    return async(dispatch) =>{
        dispatch({type: GET_COUNTRY_NAME, payload: []})
        axios.get('http://localhost:3001/countries/name?name='+name)
        .then((res) => res.data)
        .then((data) => {
            if(data.length === 0){
                alert('No se encuentra el pais con ese Nombre')
            }
            dispatch({type: GET_COUNTRY_NAME, payload: data})  
        })
        .catch((err) => alert(`el pais con el nombre ${name} no existe`));
    }
}

export const getCountryDetail = (id) => {
    return async(dispatch) => {
        dispatch({type: GET_COUNTRY_DETAIL, payload: []});
        await axios.get(`http://localhost:3001/countries/${id}`)
        .then((res) => res.data)
        .then((data) => dispatch({type: GET_COUNTRY_DETAIL, payload: data}))
        .catch((err) => console.log(err))
    }
}


//Order Country ---------------------->>>

export const filterContinent = (region) => {
    return{
        type: GET_FILTER_CONTINENT,
        payload: region,
    }
}

//ORDER ASCENDENTE DESCENDENTE ------------------->>>

export const orderAsc = () => {
    return{
        type: GET_ORDER_AZ,
    }
}

export const orderDesc = () => {
    return{
        type: GET_ORDER_ZA,
    }
}

//ORDER POPULATION --------------------->>>

export const populatinAsc = () => {
    return{
        type:GET_ORDER_POPULATION_ASC,
    }
}

export const populationDesc = () => {
    return{
        type: GET_ORDER_POPULATION_DESC,
    }
}

// FILTER ACTIVITY --------------------->>>>
export const filterActivity = (activity) => {
    return{
        type: GET_FILTER_ACTIVITY,
        payload: activity
    }
}

export const getActivity = () => {
    return async(dispatch) => {
        try {
            const response = await axios.get(`http://localhost:3001/activities`)
            let activities = response.data?.map((e) => e)
            dispatch({type: GET_ACTIVITIES, payload: activities})
        } catch (error) {
            console.log('error', error)
            console.log('no hay actividades creadas');
        }
    }
};

export const postActivity = (newActivity) => {
    return async(dispatch) => {
        try {
            const response = await axios.post('http://localhost:3001/activities', newActivity);
            dispatch({
                type:POST_ACTIVITY,
                payload: response.data,
            });
            alert('Activiti Created successfully');
        } catch (error) {
            console.log('Error', error);
            if (error.response && error.response.status === 404) {
                alert('Activity already exists');
            } else {
                alert('Activity not created, try again');
            }
        }
    }
};

