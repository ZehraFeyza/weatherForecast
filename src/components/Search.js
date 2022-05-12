import React, { useEffect, useState } from 'react'
import { Card, Col, Container, Row, Spinner } from 'react-bootstrap'
import { BsSearch } from "react-icons/bs";
import  moment from "moment";
import { useNavigate } from "react-router-dom";
import { getData } from '../api/Api';
import img from "../data/img.json";

const Search = () => {
  const [search, setSearch] = useState("");
  const [data, setData] = useState({});//data bir boş bir obje su an(apı)
  const [loading ,setLoading]=useState(false);
  const date=moment().format("MMM DD ,YYYY");
  const navigate=useNavigate();

  const handleonChange=(e)=>{
    setSearch(e.target.value);

  }

  const handleOnSubmit=(e)=>{
    e.preventDefault();
    if(search){
getData(setSearch).then((resp)=>{
  setData(resp.data);
  setSearch("");
}
)
}
}

 const handleLogout=()=>{
   setLoading(true);
   localStorage.removeItem("email");
   localStorage.removeItem("password");
   setLoading(false);
   navigate("/");
 }

useEffect(()=>{
  getData("London").then((resp)=>{
    setData(resp.data);
  })
  .catch((err)=>{
    console.log("ERROR");
  });
},[]);
  return (
    
      <Container>
        <Row  //!Arama alanı + Arama butonu
        > <Col> 
          <div  className='text-center'> 
          <form  className='arama-formu' onSubmit={handleOnSubmit}>
            <input  //Html5 ile gelen autofocus özelliği
            // ile imlec odağını input nesnesine kaydırabiliriz 
            className='arama-input w-50'
            type='search'
            placeholder='Lütfen bir sehir giriniz'
            value={search}
            onChange={handleonChange}>
              <button className='arama-btn' type='submit'> <BsSearch
              //Search ikonumuz bootstrapden
              />
              </button>
            </input>
          </form>
          </div>
          </Col>
        </Row>


        <Row //! Seçilen sehrin Bilgilerinin bulundugu Alan 
        ><Col>
        <Card>
  <Card.Body>
{search && search !==data.name &&( <h1 className='text-center'>Şehir bilgileri Bulunamadi...
    </h1>)}
   
    <table>
      <thead>
        <tr><th>{data.name} </th></tr>
      </thead>   
<tbody>
  <tr>
    <td>{img.map(function(image,i){
      return(
        img[i].name===data.weather[0].main && /*! weather[0].main:
        bu satır weather api de dizi olarak tanımlanıp  1 tane objesinin 
        içinde ki eleman main oldugundan dolayı bu sekılde yazdık
        data.weather[0]main: havaolayı getiriıyor
        data.main.temp: sıcaklık ı getiriyor
        data.main.humidity: nemlilik getiriyor
        */
        (<div key={img[i].id}/* key map de ilk elemana verilir */ >
       
          <img src={img[i].url} className="img-fluid w-50" alt="images" />
        </div>)
      )
    })} </td>
    <td>{date}</td>
    </tr>
    <tr>
      <td>{data.weather[0].main} </td > 
    </tr>
    <tr>
      <td>{data.main.temp} °C </td>
    </tr>
    <tr>
      <td> Humidity{data.main.humidity}%</td>
    </tr>
    
</tbody>
    </table>
  </Card.Body>
</Card>
</Col>
 </Row>
<Row>
  <Col>
  <button 
  type="submit"
  onClick={handleLogout}
  disabled={loading}>{<Spinner animation="border" size="sm"/>} Logout</button>
  </Col>
</Row>
 </Container>
    
  )
}

export default Search