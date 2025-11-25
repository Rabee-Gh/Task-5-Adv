import axios from "axios";
import { useRef, useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Container, Card, Form, Button, Image } from 'react-bootstrap';
import './pages.css';


interface LoginErr {
  email?: Array<string>;
  password?: Array<string>;
}

const Login = () => {
  const navigate = useNavigate();

  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const [errors, setErrors] = useState<LoginErr>({});

  const sendData = async (event: FormEvent) => {
    event.preventDefault();

    try {
      const res = await axios.post(
        "https://dashboard-i552.onrender.com/api/login",
        {
          email: emailRef.current?.value,
          password: passwordRef.current?.value,
        },
        {
          headers: {
            Accept: "application/json",
          },
        }
      );

      console.log(res.data);
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("profile_image_url", res.data.user.profile_image_url);
      localStorage.setItem("user_name", res.data.user.user_name);
      navigate("/dashboard/items");

    } catch (err) {
      console.error(err);
      if (axios.isAxiosError(err) && err.response) {
        if (err.response.data.errors) {
          setErrors(err.response.data.errors);
        }
      }
    }
  };

  return (
    <Container fluid className="d-flex flex-column justify-content-center align-items-center vh-100 m-linear">
      <Card className="p-4 rounded-4 logcard px-4">
        <Card.Body className="d-flex flex-column align-items-center">
          <Image src={`${import.meta.env.BASE_URL}assets/Logo.png`}  alt="Logo" className="mb-32" />
          <h3 className="text-center text-uppercase">Sign In</h3>
          <p className="text-muted text-center mb-32">Enter your credentials to access your account</p>
          <Form onSubmit={sendData} className="w-100 d-flex flex-column gap-3">
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter your email"
                ref={emailRef}
                className="rounded-3 login-input"
              />
              {errors?.email && (
                <Form.Text className="text-danger" style={{fontSize:"12px"}}>
                  {errors.email[0]}
                </Form.Text>
              )}
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter your password"
                ref={passwordRef}
                className="rounded-3 mb-32 login-input"
              />
              {errors?.password && (
                <Form.Text className="text-danger" style={{fontSize:"12px"}}>
                  {errors.password[0]}
                </Form.Text>
              )}
            </Form.Group>

            <Button
              variant="primary"
              type="submit"
              className="w-100 rounded-3 py-2 login-button"
            >
              SIGN IN
            </Button>
          </Form>

          <div className="mt-3 text-center">
            <p className="mb-0 text-muted">
              Don't have an account?{" "}
              <Link to="/signup" className="login-link">
                Create one
              </Link>
            </p>
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Login;

