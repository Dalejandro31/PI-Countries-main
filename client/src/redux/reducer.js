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
    activities: [],
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
                countries: action.payload.length === 0 ? state.filterCountry : action.payload,
            }
        case GET_COUNTRY_DETAIL:
            console.log('details', state.countryDetail)    
            return{
                ...state,
                countryDetail: {
                    ...action.payload,
                    activities: action.payload.activities || [],
                }
            };
        case GET_FILTER_CONTINENT:
            const fileteredRegion = state.filterCountry.filter(e => e.region.includes(action.payload))
            return{
                ...state,
                countries: action.payload === 'All' ? state.filterCountry : fileteredRegion
            }
        case GET_ORDER_AZ:
            return{
                ...state,
                countries: state.countries.slice().sort((a, b) => a.name.localeCompare(b.name))
            };
        case GET_ORDER_ZA:
            return{
                ...state,
                countries: state.countries.slice().sort((a, b) => b.name.localeCompare(a.name)) 
            };        
        case GET_ORDER_POPULATION_ASC:
            return{
                ...state,
                countries: state.countries.slice().sort((a, b) => b.population - a.population)  
            }
        case GET_ORDER_POPULATION_DESC:
            return{
                ...state,
                countries: state.countries.slice().sort((a, b) => a.population - b.population)
            }
        case GET_ACTIVITIES:
            return{
                ...state,
                activities: action.payload
            }
        case GET_FILTER_ACTIVITY:
            const activiyFiltered = state.filterCountry.filter((country) => country.activities.find((activity) => activity.name.includes(action.payload))) 
            return {
                ...state,
                countries: action.payload === 'All' ? state.filterCountry : activiyFiltered
            }    
        case POST_ACTIVITY:
            return{
                ...state,
                activities: state.activities.concat(action.payload)
            }           
        default:
            return {...state};
            
    }
}



export default configReducer;