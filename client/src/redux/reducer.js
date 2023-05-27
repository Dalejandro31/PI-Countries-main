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
}

const configReducer = (state = initialState, action) => {
//------------->> COUNTRUES <<---------------------------

    switch (action.type) {  
        case GET_ALL_COUNTRIES:

            return {
                ...state,
                countries : action.payload,
            }
            default:
                return state;
            
    }
}



export default configReducer;