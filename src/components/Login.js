import React, { useState } from 'react'
import { Container, Form,Button, Row,Col, Card, Spinner } from 'react-bootstrap';
import {useFormik} from "formik";
import * as  Yup from "yup";
import { useNavigate } from 'react-router-dom';


const Login = () => {
const [loading, setLoading] = useState(false);//Apı ye baglanıncaya kadar dönen bir spinner icin state tanımladım
const navigate=useNavigate();//sayfa yönlendirmesini tutan state
const initialValues={//Formun ilk degerleeinin oluştugu yer boş gelecek
  email:"",
  password:""
}

const validationSchema=Yup.object({//email ve sifre için şartlarımızı(validasyonlarımızı) tanımladık
  email:Yup.string().email().required("please enter your email"),
  password:Yup.string().required("please Your password must be a minimum of 6 letters").min(6),

});
const onSubmit=(values)=>{//buton submit oldugunda email ve sifredeki
  // value larformik e baglanıp  validasyonlar ile eşleşip
  // eşleşmediği kontrol edilecek onay alınorsa server a gönderilecek
setLoading(true);
console.log(values);
const email="zehra@gmail.com";
const password="zehraf";
if(email===values.email  && password==values.password){
  localStorage.setItem("email",email);
  localStorage.setItem("password",password);
  navigate("/search")//tüm validasyonlar saglanırsa sayfalar arası geciş ok
 
}
else{
  setLoading(false);
  navigate("/");
}
}

const formik=useFormik({initialValues,validationSchema,onSubmit})//useFormigimizi burada kullanıyoruz
//formik e bu 3 degerimizi gönderiyoruz, formik ise bu 3 degeri alarak kendı
//stateleri ayarlıyor, kontrole hazır hale geltiriyor




  return (
  <Container  className=" mt-5  text-center">
    <Row>
      <Col md={{span:6, offset:3}}  lg={{span:4,offset:4}} >
       
   <Card className='f'>
     <Card.Body>
    <h1> The Weather Forecast</h1><br/>
    <Form noValidate onSubmit={formik.handleSubmit}
      //!noValidate: htlml-5 den gelen default tarayici kontrolünü 
      //devredişi birakmak için kullaniliyor
      //formun submit butonuna bastiğimizda normalde backende gönderir fakar 
      //biz formda baska bir onSubmit fonksiyonu tanimladigimiz için butonuna
      //bastiğimizda öncelikle bu submit fonksiyonuna bakar
      //!onSubmit={formik.handleSubmit}  : bu kod blogu ile biz diyoruz ki , bu submit
      //!işi ile ilgili görevli kişi formiktir,formik in handleSubmit adinda 
      //!bir fonksiyonu var onu görevlendiriyoruz,handleSubmit formdaki bilgilerin
      //!backende gitmesini engelliyor,kendi sistemini devreye sokar,kendi validasyonunu
      //!yapiyor,eger bu validasyondan gecemez ise kendi belirlediği hata mesajlarini veriyor
      //!eger gecebilir ise  Formik e bagli onSubmit  fonksiyonunu  caliştiriyor,
      //!onSubmiti de API ye baglamiş olacagiz
>
  <Form.Group className="mb-3" controlId="formBasicEmail">
    <Form.Label>Email address</Form.Label>
    <Form.Control type="email" 
    {...formik.getFieldProps("email")}//kullanıcının girdigi dgeri alır formikdeki tanımlanmıs deger ile degistirir
    //yani field proplarını getirir
    isInvalid={!!formik.errors.email}
    //ısInvalıid: formik de  kontrol yapan koddur,formik de hataları tutatn 
    //errors adında bir kod ıle bırlıkte kullanılır,"formik.errors.email" ifadesi
    //string bir ifadedir mantıksal operatöre cevırmek içinbasına "!" ifadesi koyarız
    // bir tane ünlem false degeri döndürür ikinci ünlemi aldıgımızda  degilinin degili mantıgıyla true deger dondurur
     />
    <Form.Control.Feedback type="invalid"> 
      {formik.errors.email} </Form.Control.Feedback>
  </Form.Group>

  <Form.Group className="mb-3" controlId="formBasicPassword">
    <Form.Label>Password</Form.Label>
    <Form.Control type="password"
    {...formik.getFieldProps("password")} 
     isInvalid={!!formik.errors.password} />
    <Form.Control.Feedback type="invalid">
      {formik.errors.password}
    </Form.Control.Feedback>
  </Form.Group>
 
  <Button  variant="primary" type="submit" disabled={loading}// loading state i  apıye baglanma surecinde iken butonu disaqbled yapacak
  //eger loading olmuş ise kullanıcı spinner ı göstersın
  > {loading && <Spinner animation="border" size="sm"/>}
   
    Kaydol
  </Button>
</Form>
</Card.Body>
</Card>
</Col>
</Row>
  </Container>
        );
      }
      
      
 

export default Login