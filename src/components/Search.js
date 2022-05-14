import React, { useEffect, useState } from "react";
import { Card, Col, Container, Row, Spinner } from "react-bootstrap";
import { BsSearch } from "react-icons/bs";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import { getData } from "../api/Api";
import img from "../data/img.json";
import background from "../assets/img/background.webp";

const Search = () => {
  const [search, setSearch] = useState("");
  const [data, setData] = useState();
  console.log("Search -> data", data);
  const [loading, setLoading] = useState(false);
  const date = moment().format("MMM DD ,YYYY");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setSearch(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (search) {
      getData(search).then((resp) => {
        setData(resp.data);
        setSearch("");
      });
    }
  };

  const handleLogout = () => {
    setLoading(true);
    localStorage.removeItem("email");
    localStorage.removeItem("password");
    setLoading(false);
    navigate("/");
  };

  useEffect(() => {
    getData("London")
      .then((resp) => {
        console.log("Search -> resp", resp);
        setData(resp.data);
      })
      .catch((err) => {
        console.log("ERROR");
      });
  }, []);
  console.log("Search -> data", data);

  return (
    <Container className=" text-center mt-5"  >
      <Row>
        <Col>
          <Card  className="text-center"  style={{ 
      backgroundImage: `url(${background})` ,backgroundRepeat:"no-repeat",backgroundSize:"contain",
      height:600,width:600 , backgroundSize:"cover" }}>
          <div>
            <br/>
            <h1 style={{color:"white"}}> The Weather Forest </h1><br/>
            <form className="" onSubmit={handleSubmit}>
              <input
                className=""
                type="search"
                placeholder="Lütfen bir sehir giriniz"
                value={search}
                onChange={handleChange}
              />
              <button className="btn-out" type="submit">
                <BsSearch />
              </button>
            </form>
          </div>
          <br/>
            <Card.Body>
              {search && data && search !== data.name && (
                <h1 className="text-center">Şehir bilgileri Bulunamadi...</h1>
              )}
<br/>

              <table>
                <thead>
                  <tr>
                    <th>{data && data.name} </th>
                  </tr>
                </thead>
                <br/>
                <tbody>
                  <tr>
                    <td>
                      {img.map(
                        (item) =>
                          data&&item.name === data.weather[0].main && (
                            <div key={item.id}>
                              <img
                                src={`/assets/${item.url}`}
                                className="img-fluid w-50"
                                alt="images"
                              />
                            </div>
                          )
                      )}
                    </td>
                    <td>{date}</td>
                  </tr>
                  <tr>
                    <td>{data && data.weather[0].main} </td>
                  </tr>
                  <br/>
                  <tr>
                    <td>{data && data.main.temp} °C </td>
                  </tr>
                  <br/>
                  <tr>
                    <td> Humidity{data && data.main.humidity}%</td>
                  </tr>
                  <br/>
                  <tr>
                    <td>
                    <button type="submit" onClick={handleLogout} disabled={loading} >
            {loading && <Spinner animation="border" size="sm" />}  Logout
          </button>
                    </td>
                  </tr>
               
                </tbody>
              </table>
           
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col>
          
        </Col>
      </Row>
     
    </Container>
  );
};

export default Search;
