/// <reference path="../index.d.ts" />
import React from "react";
import Schema from "../schemas/CreateUser";

const CreateUser = () => {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        console.log(e);
      }}
    >
      <label htmlFor="username">Username</label>
      <input name="username" />
      <input type="submit"></input>
    </form>
  );
};

export default CreateUser;
