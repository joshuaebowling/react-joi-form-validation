/// <reference path="../index.d.ts" />
import React from "react";
import Schema from "../schemas/CreateUser";
import useValidate from "../useValidate";
import User from "../models/User";
import ValidationMessage from "../ValidationMessage";
import useTimeoutInterrupt from "../useTimeoutInterrupt";

const CreateUser = () => {
  const onSubmit = (model) => {
    console.log("onsubmit", model);
  };
  const onInvalidSubmit = (errs, joierr) => {
    console.log("uh oh", errs);
  };
  const timeoutInterrupt = useTimeoutInterrupt();
  const {
    isValid,
    update,
    currentModel,
    errors,
    ValidationMessageContainer,
    handleSubmit
  } = useValidate(
    Schema,
    new User(),
    { abortEarly: true },
    onSubmit,
    onInvalidSubmit
  );

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit();
      }}
      noValidate
    >
      <div>
        <label htmlFor="username">Username</label>
        <input
          className={errors && errors["username"] ? "invalid" : ""}
          name="username"
          aria-invalid={errors && errors["username"]}
          onChange={(e) =>
            timeoutInterrupt(() => update("username", e.target.value), 500)
          }
        />
      </div>
      <ValidationMessageContainer
        El={ValidationMessage}
        property={"username"}
      />
      <br />
      <div>
        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          onChange={(e) => update("password", e.target.value)}
        />
      </div>
      <ValidationMessageContainer
        El={ValidationMessage}
        property={"password"}
      />
      <br />
      <div>
        <label htmlFor="confirmPassword">Confirm Password</label>
        <input
          type="password"
          name="confirmPassword"
          onChange={(e) => update("confirmPassword", e.target.value)}
        />
      </div>
      <ValidationMessageContainer
        El={ValidationMessage}
        property={"confirmPassword"}
      />
      <br />
      <div
        onKeyUp={(e) => update("random", e.target.innerText)}
        style={{ border: "1px solid black" }}
        contentEditable
      >
        change the editable div
      </div>
      <ValidationMessageContainer El={ValidationMessage} property={"random"} />
      <div>
        <label htmlFor="signal">Signal</label>
        <input
          name="signal"
          onChange={(e) => update("signal", e.target.value)}
        />
      </div>
      <ValidationMessageContainer El={ValidationMessage} property={"signal"} />
      <br />
      <label htmlFor="telegram">Telegram</label>
      <input
        name="telegram"
        onChange={(e) => update("telegram", e.target.value)}
      />
      <ValidationMessageContainer
        El={ValidationMessage}
        property={"telegram"}
      />
      <br />
      <ValidationMessageContainer
        El={ValidationMessage}
        property={"undefined"}
      />
      <input type="submit"></input>
      <div>isValid={JSON.stringify(isValid)}</div>
      {errors && <pre>{JSON.stringify(errors, null, 2)}</pre>}
      <input value={isValid ? "1" : ""} required />
    </form>
  );
};

export default CreateUser;
