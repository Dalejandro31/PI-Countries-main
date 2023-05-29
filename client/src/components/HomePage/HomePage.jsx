import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { 
  getAllCountries,
  filterContinent,
  orderAsc,
  orderDesc,
  populatinAsc,
  populationDesc} from "../../redux/actions";
import Card from '../Card/CardCountry';
import NavBar from '../Nav/NavBar';
import Pagination from "../pagination/Pagination";

function Home(){
  const dispatch = useDispatch();
  const countries = useSelector(state => state.countries);
  const uniqueRegions = [... new Set(countries.map(country => country.region))];
  const [/*ordered */, setOrdered] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('All');
  const [currentPage, setCurrentPage] = useState(1)
  const [elementsPerPage, /*setElementPerPage */] = useState(10)
  

  useEffect(()=>{ 
    dispatch(getAllCountries());
  },[dispatch]);

  //logica para obtener los paises para la pagina actual 
  const indexOfLastElement = currentPage * elementsPerPage;
  const indexOfFirstElement = indexOfLastElement - elementsPerPage;
  const currentElements = countries.slice(indexOfFirstElement, indexOfLastElement);

  const paginationButtonNext = (e) => {
    e.preventDefault(); 
    setCurrentPage( currentPage + 1);
  };

  const paginationButtonPrev = (e) => {
    e.preventDefault();
    setCurrentPage( currentPage - 1); 
  };

  const handlePageCh =  (pageNumber) => {
    setCurrentPage(pageNumber);
  } 

  const handleContinent = (e) =>{
    e.preventDefault();
    dispatch(filterContinent(e.target.value))
    setSelectedRegion(e.target.value);
  }

  const handleSort = (e) => {
    e.preventDefault();
    e.target.value === 'Asc'
    ? dispatch(orderAsc(e.target.value))
    : dispatch(orderDesc(e.target.value))
    setOrdered(`order ${e.target.value}`)
  }

  const handlepopulationOrder = (e) => {
    e.preventDefault();
    e.target.value === 'populationAsc'
    ? dispatch(populatinAsc(e.target.value))
    : dispatch(populationDesc(e.target.value))
    setOrdered(`order ${e.target.value}`)
    console.log(populatinAsc());
  }

  return(
    <div>
      <NavBar/>
      <h1>Home Page</h1>
      <div>
        <select
          onChange={(e) => handleContinent(e)}
          className="continent"
          value={selectedRegion}
          >
            <option value='All'>All Countries</option>
            {
              uniqueRegions.map((region, index) => (
                <option value={region} key={index}>{region}</option>
              ))
            }
          </select>
      </div>

      <div>
        <div>
            <button className="Az" value='Asc' onClick={(e) => handleSort(e)}>A - Z</button>
            <button className="ZA" value='Desc' onClick={(e) => handleSort(e)}>Z - A</button>
        </div>
        <div>
          <button className="popAsc" value='populationAsc' onClick={(e) => handlepopulationOrder(e)}>populatinAsc</button>
          <button className="popDesc" value='populationDesc' onClick={(e) => handlepopulationOrder(e)}>populatinDesc</button>
        </div>
      </div>

      <div>
        <div>
          {
            currentPage === 1 ? (<span></span>) : (<button className="" onClick={e => paginationButtonPrev(e)}>Prev</button>)
          }
        </div>
        <div>
          <Pagination
            currentPage={currentPage}
            elementsPerPage={elementsPerPage}
            totalElements={countries.length}
            onPageChange={handlePageCh}
          />
          <div>
            {
              Math.ceil(countries.length / elementsPerPage) > currentPage ? (
                <button className=""  onClick={e => paginationButtonNext(e)}>next</button>
              ) : (<span></span>)
            }
          </div>
        </div>
      </div>
      <div>
        {currentElements.map((country) =>(
          <Card
            key={country.id}
            id={country.id}
            name={country.name}
            flag={country.flag}
            region={country.region}
          />
        ))}
      </div>
    </div>
    
  )
}

export default Home;