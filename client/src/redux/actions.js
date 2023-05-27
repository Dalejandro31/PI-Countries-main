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