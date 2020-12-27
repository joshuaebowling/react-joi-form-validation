/// <reference path="../index.d.ts" />
import React from "react";
import Schema from "../schemas/CreateUser";
import useValidate from "../useValidate";
import User from "../models/User";
const CreateUser = () => {
  const { isValid, update, currentModel, errors } = useValidate(
    Schema,
    new User()
  );
  console.log("errors", errors);
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        console.log(e);
      }}
    >
      <label htmlFor="username">Username</label>
      <input
        name="username"
        onChange={(e) => update("username", e.target.value)}
      />
      <br />
      <label htmlFor="password">Password</label>
      <input
        type="password"
        name="password"
        onChange={(e) => update("password", e.target.value)}
      />
      <br />
      <label htmlFor="confirmPassword">Confirm Password</label>
      <input
        type="password"
        name="confirmPassword"
        onChange={(e) => update("confirmPassword", e.target.value)}
      />
      <br />
      <div
        onKeyUp={(e) => update("random", e.target.innerText)}
        style={{ border: "1px solid black" }}
        contentEditable
      >
        editable div
      </div>
      <input type="submit"></input>
      <div>isValid={JSON.stringify(isValid)}</div>
      {errors && <pre>{errors.toString()}</pre>}
    </form>
  );
};

export default CreateUser;
