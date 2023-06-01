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
        setNewActivity({
            ...newActivity,
            [e.target.name] : e.target.value,
        })
        setError(Validation({
            ...newActivity,
            [e.target.name] : e.target.value,
        }))
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
                            {
                                countries.length >= 1 ?
                                countries?.map((elem, index) => (
                                    <label htmlFor='country' key={index}>
                                        <input type='checkbox' name='country' value={elem.name} key={index} onChange={handleChecked}/>
                                        {elem.name}
                                    </label>
                                ))
                                :undefined
                            }
                        </div>
                    </div>

                
                <div>
                    {
                        newActivity.name !== '' && newActivity.difficulty !== '' && newActivity.duration !== '' && newActivity.season !== '' && newActivity.country.length >=1
                        ? <button className='' type='submit' onClick={ (e) => handleSubmit(e)}>submit</button>
                        : <button disabled className=''>submit</button>
                    }
                </div>
            </form>
        </div>
    )
}

export default Form;