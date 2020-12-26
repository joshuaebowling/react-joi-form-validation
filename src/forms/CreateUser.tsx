/// <reference path="../index.d.ts" />
import React from "react";
import Schema from "../schemas/CreateUser";
import useValidate from "../useValidate";
import User from "../models/User";
const CreateUser = () => {
  const { isValid, update, errors } = useValidate(Schema, new User());
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
      <input type="submit"></input>
      <div>{JSON.stringify(isValid)}</div>
    </form>
  );
};

export default CreateUser;
