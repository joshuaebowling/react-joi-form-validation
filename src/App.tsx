import * as React from "react";
import "./styles.css";
import CreateUserForm from "./forms/CreateUser";

export default function App() {
  return (
    <div className="App">
      <h1>React Joi Form Validation (WiP)</h1>
      <h2>See Readme for explanation</h2>
      <p>
        <small>
          <a href="https://github.com/joshuaebowling/react-joi-form-validation">
            See github repo here
          </a>
        </small>
      </p>
      <CreateUserForm />
    </div>
  );
}
