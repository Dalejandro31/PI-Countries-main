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

    const [ newActivity, setNewActivity ] = useState ({
        name: '',
        difficulty: '',
        duration: '',
        season: '',
        country : [],
    })

    const [ error, setError ] = useState ({
        name: '',
        difficulty: '',
        duration: '',
        season: '',
        country : [],
    })

    const handleChange = (e) => {
        const { name, value } = e.target

        if(name === 'country'){
            const selectedCountries = {...newActivity.country};
            if(selectedCountries[value]){
                delete selectedCountries[value];
            }else{
                selectedCountries[value] = true;
            }
            setNewActivity({
                ...newActivity,
                country: selectedCountries,
            });
        }else{
            setNewActivity({
                ...newActivity,
                [name]: value
            });
        }
        setError(Validation ({
            ...newActivity,
            [name]: value,
        }));
    }

    const handleCheked = (e) => {
        if(e.target.checked) {
            setNewActivity ({
                ...newActivity,
                country : [...newActivity.country, e.target.value]
            })
        }else{
            setNewActivity({
                ...newActivity,
                country : newActivity.country.filter(x => x !== e.target.value)
            })
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        // axios.post('http://localhost:3001/activities', newActivity)
        // .then(res => alert('Activity created succesfully'))
        // .then(err => alert('Activity not crated, try again'))
        dispatch(postActivity(newActivity));
        setNewActivity({
            name: '',
            difficulty: '',
            duration: '',
            season: '',
            country : [],
        })
    }

    const hanleCountryChange = (e) => {
        setNewActivity({        
            ...newActivity,
            country: [e.target.value]
        })
    }

    const isFieldEmpty = (fieldName) => {
        return newActivity[fieldName].trim() === '';
    }

    


    return(
        <div>
            <h1>Form</h1>
            <Link to = '/home'><button type='submit' className=" ">Home Page</button></Link>
            <Link to = '/'><button type='submit' className=" ">Landing Page</button></Link>
            <Link to = '/detail'><button type='submit' className=" ">Detail Page</button></Link>

            <form>
                <h1> CREATE YOUR ACTIVITY </h1>

                <div>
                    <label htmlFor='name'>Nombre</label>
                    <input className={`${style.inputForms} ${isFieldEmpty('name') && style.inputFormsEmpty}`} value={newActivity.name}  type="text" name='name' onChange={handleChange}/>
                </div>
                <div>
                    <label>Dificultad</label>
                        <select name="difficulty" value={newActivity.difficulty} onChange={handleChange}>
                            <option value='' >Seleccione una opción</option>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                        </select>   
                </div>
                <div>
                    <label>Duracion (horas)</label>
                    <input className={`${style.inputForms} ${isFieldEmpty('name') && style.inputFormsEmpty}`} value={newActivity.duration} type="number" name='duration' onChange={handleChange}/>
                </div>
                <div>
                    <label>Temporada</label>
                        <select name="season" value={newActivity.season} onChange={handleChange}>
                            <option value=''>Seleccione una opción</option>
                            <option value="Summer">Summer</option>
                            <option value="Fall">Fall</option>
                            <option value="Winter">Winter</option>
                            <option value="Spring">Spring</option>
                        </select>
                </div>
                
                    <h2>Escoge los paises a los que les asiganaras tu nueva actividad</h2>
                    <div>
                        <div>
                            <label>Paises</label>
                                <select multiple value={Object.keys(newActivity.country)} onChange={handleChange} name='country'>
                                    
                                    {countries.length >= 1 &&
                                    countries.map((elem, index) => (
                                        <option key={index} value={elem.name}>
                                            {elem.name}
                                        </option>
                                    ))}
                                </select>
                        </div>
                    </div>

                    <div>
                        <h3>Paises seleccinados: </h3>
                        <ul>
                            {Object.keys(newActivity.country).map((country, index) => (
                                <li key={index}>{country}</li>
                            ))}
                        </ul>
                    </div>
                
                <div>
                <button
                    type='submit'
                    onClick={handleSubmit}
                    disabled={
                        newActivity.name === '' ||
                        newActivity.difficulty === '' ||
                        newActivity.duration === '' ||
                        newActivity.season === '' ||
                        newActivity.country.length === 0
                    }
                >
                    Submit
                </button>
                </div>
            </form>
        </div>
    )
}

export default Form;