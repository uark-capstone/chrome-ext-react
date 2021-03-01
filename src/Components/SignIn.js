/*global chrome*/
import { React, useState, useEffect } from "react";
import { Button, Form, Spinner } from "react-bootstrap";
import Logo from './logo.jpeg';

const SignIn = () => {
  let DESTINATION_URL = process.env.REACT_APP_DESTINATION_URL;
  let BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
  


  const [email, setEmail] = useState("af027@uark.edu");
  const [password, setPassword] = useState("password");
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

    fetch( BACKEND_URL + `user/login`, requestOptions)
      .then((res) => {
        if (res.status === 200) {
          return res.json();
        }
        if (res.status === 401) {
          console.log("Error logging in");
          setResult("Wrong credentials!");
          
          return null;
        }
      })
      .then(responseData => {
        if(responseData != null){
          let destinationURL = DESTINATION_URL + responseData.id + '/' + '1';
 
          chrome.tabs.create({ url: destinationURL, active: false, pinned: true });
          window.close();
        }
        setIsLoading(false);
      })
      .catch((error) => console.error(error));
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
      {DESTINATION_URL}
      {BACKEND_URL}
    </div>
  );
};

export default SignIn;
// https://www.npmjs.com/package/react-webcam
