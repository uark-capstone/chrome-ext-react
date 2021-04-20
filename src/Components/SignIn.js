/*global chrome*/
import { React, useState, useEffect } from "react";
import {Button, Form, Dropdown } from "react-bootstrap";
import Logo from './logo.jpeg';
import './Signin.css';

const SignIn = () => {
  let DESTINATION_URL = process.env.REACT_APP_DESTINATION_URL;
  let BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
  
  const [userID, setUserID] = useState(-1);
  const [lectureID, setLectureID] = useState(-1);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [showBuildInfo, setShowBuild] = useState(false);

  const [lectures, setLectures] = useState([]);

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

      getAllLectures();
  };

  const getAllLectures = () => {
    fetch( BACKEND_URL + `lecture/getAllLectures`)
    .then((res) => {
      return res.json();
    })
    .then(responseData => {
      setLectures(responseData);  
    })
    .catch((error) => console.error(error));
  }

  const joinLecture = (e) => {
    if(lectureID != -1){
      let destinationURL = DESTINATION_URL + userID + '/' + lectureID;
      chrome.tabs.create({ url: destinationURL, active: false, pinned: true });
      window.close();
    }
  }

  getAllLectures();

  return (
          <div style = {{paddingTop: "0px", display: "flex", justifyContent: "center"}}>
      <div style={{ width: "300px" }}>
          <div style={{paddingTop: "10px", display: "flex", justifyContent: "center"}}>
          <img
          src={Logo}
          height="140"
          width="200"
        />
        </div>
        
          <div style={{paddingTop: "25px", paddingBottom: "25px", display: "flex", justifyContent: "center"}}>
          {isLoggedIn
          ? <Form>
              <Form.Group>
                <Dropdown >
                  <Dropdown.Toggle>
                    {lectureID != -1 ? ('Lecture: ' + lectureID) : 'Select Lecture'}
                  </Dropdown.Toggle>
                  <Dropdown.Menu className="dropdown-menu">
                    {lectures.map((eachLecture, idx) => (
                      <Dropdown.Item 
                        key={idx}
                        onClick={(e) => setLectureID(eachLecture.id)}>
                        {eachLecture.lectureName}
                      </Dropdown.Item>
                    ))}
                  </Dropdown.Menu>
                </Dropdown>
              </Form.Group>

              <Button
                bsClass = "Button"
                style={{display: "flex", justifyContent: "center", }}
                variant="primary"
                type="submit"
                onClick={(e) => joinLecture(e)}
              >
                Join Lecture
              </Button>
            </Form>
          : <Form>
              <Form.Group controlId="formBasicEmail">
                <Form.Label>Email</Form.Label>
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
                style={{display: "flex", justifyContent: "center"}}
                variant="primary"
                type="submit"
                onClick={(e) => login(e)}
              block>
                Submit
              </Button>
            </Form>
          }
        </div>
        
      {result}  
      
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
