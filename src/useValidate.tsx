/// <reference path="index.d.ts" />
import React, { useState, useEffect } from "react";
import { assign } from "lodash";
import Joi from "joi";

const ValidationMessageContainer = ({ errors }) => ({
  El,
  errors,
  property
}) => {
  console.log("errors3", errors);
  if (!errors) return <></>;
  console.log("errors", errors);
  console.log("property=", property);
  const message = errors[property];
  if (!message) return <></>;
  return <El message={message} />;
};

const parseErrors = (joiError) => {
  if (!joiError) return null;
  let result = {};
  joiError.details.forEach((x: Joi.ErrorReport) => {
    result[x.context.key] = x.message;
  });
  return result;
};

function useValidate(Schema: Joi.Schema, model) {
  const [currentModel, setCurrentModel] = useState(model);
  const [isValid, setIsValid] = useState(Schema.validate(model));
  const [errors, setErrors] = useState<any | undefined>(undefined);
  const update = (prop, value) => {
    const newCurrentModel = assign({}, currentModel, { [prop]: value });
    setCurrentModel(newCurrentModel);
  };
  const getError = (prop: string | null) => {
    return !errs ? null : errs[prop === null ? "undefined" : prop];
  };
  useEffect(() => {
    const { error, value } = Schema.validate(currentModel);
    //    setErrors(errors);
    console.log("error4", error);
    const errs = parseErrors(error);
    setIsValid(error === undefined);
    setErrors(errs);
  }, [currentModel]);

  return {
    update,
    isValid,
    currentModel,
    errors,
    getError,
    ValidationMessageContainer: ValidationMessageContainer({ errors })
  };
}

export default useValidate;
