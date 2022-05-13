import React, { useState } from "react";
import {
  Container,
  Form,
  Button,
  Row,
  Col,
  Card,
  Spinner,
} from "react-bootstrap";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const initialValues = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object({
    email: Yup.string()
      .email()
      .required("please enter your email"),
    password: Yup.string()
      .required("please Your password must be a minimum of 6 letters")
      .min(6),
  });
  const onSubmit = (values) => {
    setLoading(true);
    console.log(values);
    const email = "zehra@gmail.com";
    const password = "zehraf";
    if (email === values.email && password === values.password) {
      localStorage.setItem("email", email);
      localStorage.setItem("password", password);
      navigate("/search");
    } else {
      setLoading(false);
      navigate("/");
    }
  };

  const formik = useFormik({ initialValues, validationSchema, onSubmit });
  return (
    <Container className=" mt-5  text-center">
      <Row>
        <Col md={{ span: 6, offset: 3 }} lg={{ span: 4, offset: 4 }}>
          <Card className="f">
            <Card.Body>
              <h1> The Weather Forecast</h1>
              <br />
              <Form noValidate onSubmit={formik.handleSubmit}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    type="email"
                    {...formik.getFieldProps("email")}
                    isInvalid={!!formik.errors.email}
                  />
                  <Form.Control.Feedback type="invalid">
                    {formik.errors.email}{" "}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    {...formik.getFieldProps("password")}
                    isInvalid={!!formik.errors.password}
                  />
                  <Form.Control.Feedback type="invalid">
                    {formik.errors.password}
                  </Form.Control.Feedback>
                </Form.Group>

                <Button variant="primary" type="submit" disabled={loading}>
                  {loading && <Spinner animation="border" size="sm" />}
                  Kaydol
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
