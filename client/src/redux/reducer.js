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

const initialState= {
    countries : [],
    filterCountry: [],
    countryDetail: [],
}

const configReducer = (state = initialState, action) => {
//------------->> COUNTRUES <<---------------------------

    switch (action.type) {  
        case GET_ALL_COUNTRIES: 
            return {
                ...state,
                countries : action.payload,
                filterCountry: action.payload
            }
        
        case GET_COUNTRY_NAME:
            return{
                ...state,
                countries: action.payload
            }
        case GET_COUNTRY_DETAIL:
            console.log('details', state.countryDetail)    
            return{
                ...state,
                countryDetail: action.payload
            };
        case GET_FILTER_CONTINENT:
            const continentFiltered = state.filterCountry.filter(e => e.region.includes(action.payload))
            return{
                ...state,
                countries: action.payload === 'All' ? state.filterCountry: continentFiltered
            }        
        default:
            return {...state};
            
    }
}



export default configReducer;