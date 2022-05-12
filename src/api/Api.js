import axios from "axios";//component gibi davranmıyor bu sayfa
//logın fonksiyonumuzu yazıyoruz


const API_URL=process.env.REACT_APP_API_URL;
const API_KEY=process.env.REACT_APP_API_KEY;
const getData=(sehiradi)=>{
   return (axios.get(
      `${API_URL}data/2.5/weather?q=${sehiradi}&appid=${API_KEY}&units=metric`)) 
};
export {getData};