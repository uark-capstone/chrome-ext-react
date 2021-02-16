/*global chrome*/
import { React, useState, useEffect } from "react";
import { Button, Form, Spinner } from "react-bootstrap";
import Logo from './logo.jpeg';
// import { Link } from 'react-router-dom';

URL = "https://learn.uark.edu/";
//URL="http://localhost:3000/";
// const openPinnedTab = () => {
// chrome.tabs.create({ url: URL, active: false, pinned: true });
// window.close();
// };

const SignIn = () => {
  const myStorage = window.localStorage;
  const [email, setEmail] = useState("af027@uark.edu");
  const [password, setPassword] = useState("password");
  //const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState("");

  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email: `${email}`,
      password: `${password}`,
    }),
  };

  const login = (e) => {
    e.preventDefault();

    console.log("entered");
    console.log("email", email);
    console.log("password", password);

    fetch(`http://localhost:8080/user/login`, requestOptions)
      .then((res) => {
        console.log("res.status: ", res.status);
        if (res.status === 200) {
          var response = res.text();
          console.log(response);
          myStorage.setItem("logged_in", true);
          setIsLoading(false);
          chrome.tabs.create({ url: URL, active: false, pinned: true });
          window.close();
        }
        if (res.status === 500) {
          console.log("error ");
          setResult("Wrong credentials!");
          myStorage.setItem("logged_in", false);
        }
      })
      .catch((error) => console.log("HELLOOO", error));
  };
  return (
    <div>
      <div style={{ width: "500px" }}>
        <div style={{ position: "absolute", left: "200px"}}>
          <img
          src={Logo}
          height="100"
          width="100"
          
        />
        </div>
        
        {/* <h1 style={{ position: "absolute", left: "200px" }}> Team 10!!</h1> */}
        <Form style={{ padding: "50px", padding: "150px", paddingBottom:"120px"}}>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>
          {/* <Form.Group controlId="formBasicCheckbox">
            <Form.Check type="checkbox" label="Check me out" />
          </Form.Group> */}
          <Button
            style={{ position: "absolute", left: "200px" }}
            variant="primary"
            type="submit"
            onClick={(e) => login(e)}
          >
            Submit
          </Button>
        </Form>
      </div>
      {result}
    </div>
  );
};

export default SignIn;
// https://www.npmjs.com/package/react-webcam
