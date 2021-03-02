/*global chrome*/
import { React, useState, useEffect } from "react";
import { Button, Form, Spinner } from "react-bootstrap";
import Logo from './logo.jpeg';

const SignIn = () => {
  let DESTINATION_URL = process.env.REACT_APP_DESTINATION_URL;
  let BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
  
  const [userID, setUserID] = useState(-1);
  const [lectureID, setLectureID] = useState(-1);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [showBuildInfo, setShowBuild] = useState(false);

  const [email, setEmail] = useState("af027@uark.edu");
  const [password, setPassword] = useState("password");
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
          setUserID(responseData.id)
          setIsLoggedIn(true);
        }        
      })
      .catch((error) => console.error(error));
  };

  const joinLecture = (e) => {
    let destinationURL = DESTINATION_URL + userID + '/' + lectureID;
    chrome.tabs.create({ url: destinationURL, active: false, pinned: true });
    window.close();
  }

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
        
        <div style={{ padding: "50px", padding: "150px", paddingBottom:"120px"}}>
          {isLoggedIn
          ? <Form>
              <Form.Group>
                <Form.Label>Lecture ID</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Enter Lecture Id"
                    value={lectureID}
                    onChange={(e) => setLectureID(e.target.value)}
                  />
              </Form.Group>

              <Button
                style={{ position: "absolute", left: "200px" }}
                variant="primary"
                type="submit"
                onClick={(e) => joinLecture(e)}
              >
                Join Lecture
              </Button>
            </Form>
          : <Form>
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
          }
        </div>
        
      {result}  
      
      <p
        onClick={() => setShowBuild(!showBuildInfo)}>
        Build Information
      </p>
      {showBuildInfo &&
        <div>
          <p>Destination URL: {DESTINATION_URL}</p> 
          <p>Backend URL: {BACKEND_URL}</p> 
        </div>
      }
    
      </div>
    </div>
  );
};

export default SignIn;
// https://www.npmjs.com/package/react-webcam
