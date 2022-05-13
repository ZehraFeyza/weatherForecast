import React, { useEffect, useState } from "react";
import { Card, Col, Container, Row, Spinner } from "react-bootstrap";
import { BsSearch } from "react-icons/bs";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import { getData } from "../api/Api";
import img from "../data/img.json";

const Search = () => {
  const [search, setSearch] = useState("");
  const [data, setData] = useState();
  console.log("​Search -> data", data);
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
        console.log("​Search -> resp", resp);
        setData(resp.data);
      })
      .catch((err) => {
        console.log("ERROR");
      });
  }, []);
  console.log("​Search -> data", data);

  return (
    <Container>
      <Row>
        <Col>
          <div className="text-center">
            <form className="arama-formu" onSubmit={handleSubmit}>
              <input
                className="arama-input w-50"
                type="search"
                placeholder="Lütfen bir sehir giriniz"
                value={search}
                onChange={handleChange}
              />
              <button className="arama-btn" type="submit">
                <BsSearch />
              </button>
            </form>
          </div>
        </Col>
      </Row>
      <Row>
        <Col>
          <Card>
            <Card.Body>
              {search && data && search !== data.name && (
                <h1 className="text-center">Şehir bilgileri Bulunamadi...</h1>
              )}

              <table>
                <thead>
                  <tr>
                    <th>{data && data.name} </th>
                  </tr>
                </thead>
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
                  <tr>
                    <td>{data && data.main.temp} °C </td>
                  </tr>
                  <tr>
                    <td> Humidity{data && data.main.humidity}%</td>
                  </tr>
                </tbody>
              </table>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col>
          <button type="submit" onClick={handleLogout} disabled={loading}>
            {<Spinner animation="border" size="sm" />} Logout
          </button>
        </Col>
      </Row>
    </Container>
  );
};

export default Search;
