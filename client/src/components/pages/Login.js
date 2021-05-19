import React, { useState, useContext, useEffect } from "react";
import {
  Card,
  CardBody,
  CardTitle,
  Container,
  Input,
  Button,
} from "reactstrap";
import AuthContext from "../../context/auth/AuthContext";
import AlertContext from "../../context/alert/AlertContext";
import { useHistory } from "react-router-dom";
function Login() {
  const history = useHistory();
  const alertContext = useContext(AlertContext);
  const authContext = useContext(AuthContext);
  const { authorization } = authContext;
  const [isRegister, setIsRegister] = useState(false);
  const [userInput, setUserInput] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  // track user input
  const onChange = (e) => {
    setUserInput({ ...userInput, [e.target.name]: e.target.value });
  };
  // submit user form login for register or login
  const onSubmit = (e) => {
    e.preventDefault();
    if (isRegister) {
      if (userInput.password !== userInput.confirmPassword) {
        alertContext.addAlert({ msg: "password must be match" });
      } else {
        authContext.registerUser(userInput);
      }
    } else {
      authContext.loginUser({
        email: userInput.email,
        password: userInput.password,
      });
      history.push("/");
    }
  };
  useEffect(() => {
    if (authorization) {
      history.push("/");
    }
  }, [authorization]);
  return (
    <div className="d-flex justify-content-center">
      <Container className="text-center">
        <h1 className="py-5">Student Management System</h1>
        <form onSubmit={onSubmit} className="col-lg-4 mx-auto">
          {!isRegister && (
            <Card>
              <CardBody>
                <CardTitle className="fs-3 fw-bold">Login</CardTitle>
                <Input
                  onChange={onChange}
                  name="email"
                  type="email"
                  placeholder="Email"
                  className="my-3"
                  required
                  value={userInput.email}
                />
                <Input
                  type="password"
                  onChange={onChange}
                  name="password"
                  placeholder="Password"
                  className="my-3"
                  required
                  minLength="6"
                  value={userInput.password}
                />
                <Button className="w-100 bg-warning border-0">Login</Button>
                <Button
                  onClick={() => setIsRegister(true)}
                  className="w-100 my-3"
                >
                  Register
                </Button>
              </CardBody>
            </Card>
          )}
          {isRegister && (
            <Card>
              <CardBody>
                <CardTitle className="fs-3 fw-bold">Register</CardTitle>
                <Input
                  onChange={onChange}
                  name="name"
                  placeholder="Name"
                  className="my-3"
                  value={userInput.name}
                  required
                  type="text"
                />
                <Input
                  value={userInput.email}
                  onChange={onChange}
                  name="email"
                  placeholder="Email"
                  className="my-3"
                  required
                  type="email"
                />
                <Input
                  onChange={onChange}
                  name="password"
                  placeholder="Password"
                  className="my-3"
                  value={userInput.password}
                  required
                  type="password"
                />
                <Input
                  onChange={onChange}
                  name="confirmPassword"
                  placeholder="ConfirmPassword"
                  className="my-3"
                  value={userInput.confirmPassword}
                  required
                  type="password"
                />
                <Button className="w-100 my-3">Register</Button>
                <Button
                  onClick={() => setIsRegister(false)}
                  className="w-100 bg-warning border-0"
                >
                  Login
                </Button>
              </CardBody>
            </Card>
          )}
        </form>
      </Container>
    </div>
  );
}

export default Login;
