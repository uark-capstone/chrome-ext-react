/*global chrome*/
import React from "react";
import { Button, Form } from "react-bootstrap";

// import { Link } from 'react-router-dom';
URL = "https://learn.uark.edu/";
//URL="http://localhost:3000/";

const openPinnedTab = () => {
    chrome.tabs.create({ url: URL, active: false, pinned: true});
    window.close();
}

const SignIn = () => {
  return (
    <div style={{ width: "500px" }}>
      <Form style={{ padding: "50px" }}>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" />
        </Form.Group>
        <Form.Group controlId="formBasicCheckbox">
          <Form.Check type="checkbox" label="Check me out" />
        </Form.Group>
        <Button
        style={{ position:"absolute", left:"200px"}}
          variant="primary"
          type="submit"
          onClick={openPinnedTab}
        >
          Submit
        </Button>
      </Form>

      {/* <Button
  onClick={() => {
    chrome.tabs.create({ url: URL, active: false, pinned: true});
    window.close();
  }}
//onClick={createsTab()}
  >
  Chrome Tab
</Button> */}
    </div>
  );
};

export default SignIn;
// https://www.npmjs.com/package/react-webcam
