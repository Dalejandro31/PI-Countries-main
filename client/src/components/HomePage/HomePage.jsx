import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllCountries,
        orderContinent} from "../../redux/actions";
import Card from '../Card/CardCountry';
import NavBar from '../Nav/NavBar';
import Pagination from "../pagination/Pagination";

function Home(){
  const dispatch = useDispatch();
  const countries = useSelector(state => state.countries);
  const [/*ordered */, setOrdered] = useState('');
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
    dispatch(orderContinent(e.target.value))
    setOrdered(`order ${e.target.value}`)
  }

  return(
    <div>
      <NavBar/>
      <h1>Home Page</h1>
      <div>
        <select
          onChange={(e) => handleContinent(e)}
          className="continent">
            <option value='All'>All Countries</option>
            {
              countries.map((e, index) => (
                <option value={e.region} key={index}>{e.region}</option>
              ))
            }
          </select>
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