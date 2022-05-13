import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;
const API_KEY = process.env.REACT_APP_API_KEY;

const getData = (sehiradi) => {
  console.log(
    `${API_URL}data/2.5/weather?q=${sehiradi}&appid=${API_KEY}&units=metric`
  );
  return axios.get(
    `${API_URL}data/2.5/weather?q=${sehiradi}&appid=${API_KEY}&units=metric`
  );
};
export { getData };
