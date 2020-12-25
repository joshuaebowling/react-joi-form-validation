import * as React from "react";
import "./styles.css";
import CreateUserForm from "./forms/CreateUser";
import CreateUser from "./schemas/CreateUser";

export default function App() {
  return (
    <div className="App">
      <h1>React Joi Form Validation</h1>
      <CreateUserForm />
    </div>
  );
}
