import React, { useEffect, useState }from 'react';
import axios from 'axios';
import style from './Form.module.css';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import { getAllCountries, postActivity } from "../../redux/actions";
import Validation from './Validation';

function Form(){

    const countries = useSelector( state => state.countries)
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllCountries())
    },[dispatch])

    const [newActivity, setNewActivity] = useState({
        name: '',
        difficulty: '',
        duration: '',
        season: '',
        country: [],
    });

    const [ error, setError ] = useState ({
        name: '',
        difficulty: '',
        duration: '',
        season: '',
        country : [],
    })

    const handleChange = (e) => {
        const {name, value} = e.target;
        let newValue = value;
        if (name === 'duration') {
            const parseValue = parseInt(value , 10)
            if(parseValue < 0){
                newValue = '0';
            }else if(parseValue > 24){
                newValue = '24';
            }
        }
        setNewActivity({
            ...newActivity,
            [name]: newValue,
        });
        setError(
            Validation({
                ...newActivity,
                [name]: newValue,
            })
        );
        
    }

    const handleChecked = (e) => {
        if( e.target.checked ){
            setNewActivity({
                ...newActivity,
                country : [...newActivity.country, e.target.value]
            })
        }else{
            setNewActivity({
                ...newActivity,
                country : newActivity.country.filter( (country) => country !== e.target.value)
            })
        }
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        // axios.post('http://localhost:3001/activities', newActivity)
        // .then(res => alert('Activity created succesfully'))
        // .then(err => alert('Activity not crated, try again')
        dispatch(postActivity(newActivity))
        setNewActivity({
            name: '',
            difficulty: '',
            duration: '',
            season: '',
            country : [],
        })
    }

    const isFieldEmpty = (fieldName) => {
        return newActivity[fieldName].trim() === '';
    }

    const isCountrySelected = () => {
        return newActivity.country.length === 0;
    }

    const sortedCountries = countries.slice().sort((a,b) => {
        return a.name.localeCompare(b.name);
    });


    return(
        <div className={style.container}>
            <div>
                <Link to = '/home'><button type='submit' className={style.buttonhome}>Home Page</button></Link>
                <Link to = '/'><button type='submit' className={style.buttonhome}>Landing Page</button></Link>
            </div>
            

            <form className={style.formPadre}>
                <h1> CREATE YOUR ACTIVITY </h1>

                <div className={style.contenedorInfoActiviy}>

{/* ---------------------------------------------------------->> NAME <<----------------------------------------------------------*/}
                <div className={style.form}> 
                    <label className={style.label} htmlFor='name'>Nombre</label>
                </div>
                <div className={style.form}>
                    <input 
                        className={`${style.inputForms} ${isFieldEmpty('name') && style.inputFormsEmpty}`} 
                        value={newActivity.name}  
                        type="text" 
                        name='name' 
                        onChange={handleChange}
                        />
                    <div>
                        { error.name && (<span className={style.errorMessage}>{error.name}</span>)}
                    </div>
                </div>
                
{/* ---------------------------------------------------------->> DIFFICULTY <<----------------------------------------------------------*/}
                <div className={style.form}>
                    <label className={style.label}>Dificultad</label>
                </div>
                <div className={style.form}>
                        <select  
                            className={`${style.inputForms} ${isFieldEmpty('difficulty') && style.inputFormsEmpty}`} 
                            name="difficulty" 
                            value={newActivity.difficulty} 
                            onChange={handleChange}
                        >
                            <option value='' >Seleccione una opción</option>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                        </select>  
                </div>
                <div>
                    {error.difficulty && (<span className={style.errorMessage}>{error.difficulty}</span>)}
                </div>

{/* ---------------------------------------------------------->> DURATION <<----------------------------------------------------------*/}
                <div className={style.form}>
                    <label className={style.label}>Duracion(Horas)</label>
                </div>
                <div className={style.form}>
                    <input 
                        className={`${style.inputForms} ${isFieldEmpty('duration') && style.inputFormsEmpty}`} 
                        value={newActivity.duration} 
                        type="number" 
                        name='duration' 
                        onChange={handleChange}
                        />
                </div>
                <div>
                    { error.duration && <span className={style.errorMessage}>{error.duration}</span>}
                </div>

{/* ---------------------------------------------------------->> SEASON <<----------------------------------------------------------*/}
                <div className={style.form}>
                    <label className={style.label}>Temporada</label>
                </div>
                <div className={style.form}>
                        <select
                            className={`${style.inputForms} ${isFieldEmpty('season') && style.inputFormsEmpty}`} 
                            name="season" 
                            value={newActivity.season} 
                            onChange={handleChange}
                        >
                            <option value=''>Seleccione una opción</option>
                            <option value="Summer">Summer</option>
                            <option value="Fall">Fall</option>
                            <option value="Winter">Winter</option>
                            <option value="Spring">Spring</option>
                        </select>
                </div> 
                <div>
                    {error.season && (<span className={style.errorMessage}>{error.season}</span>)}  
                </div>
                </div>

{/* ---------------------------------------------------------->> COUNTRY <<----------------------------------------------------------*/}
                    <div className={style.countryContainer}>
                    <h2>Escoge los paises a los que les asiganaras tu nueva actividad</h2>
                        <div className={style.scrollableContainer}>
                            {
                                sortedCountries.length >= 1 ?
                                sortedCountries?.map((elem, index) => (
                                    <div key={index}>
                                        <label htmlFor={`country_${index}`} className={style.countryLabel} key={index}>
                                        <input type='checkbox' className={style.countryCheckbox} name={`country_${index}`} value={elem.name} key={index} onChange={handleChecked}/>
                                        {elem.name}
                                        </label>
                                    </div>
                                    
                                ))
                                :undefined
                            }
                        </div>
                        {isCountrySelected() && <p className={style.errorMessage}>Debe seleccionar al menos un país</p>}
                    </div>

                
            </form>


            <div className={style.buttonContainer}>
                    {
                        newActivity.name !== '' && newActivity.difficulty !== '' && newActivity.duration !== '' && newActivity.season !== '' && newActivity.country.length >=1
                        ? <button className={style.buttonSubmit} type='submit' onClick={ (e) => handleSubmit(e)}>submit</button>
                        : <button disabled className={style.buttonDisabeld}>submit</button>
                    }
            </div>
        </div>
    )
}

export default Form;