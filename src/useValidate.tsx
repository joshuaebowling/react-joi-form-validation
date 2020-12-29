/// <reference path="index.d.ts" />
import React, { useState, useEffect } from "react";
import { assign } from "lodash";
import Joi from "joi";

const ValidationMessageContainer = ({ errors }) => ({ El, property }) => {
  console.log("errors3", errors);
  if (!errors) return <></>;
  console.log("errors", errors);
  console.log("property=", property);
  const message = errors[property];
  if (!message) return <></>;
  return <El message={message} />;
};

const parseErrors = (joiError: Joi.ValidationError) => {
  if (!joiError || !joiError.details) return null;
  let result: any = {};
  joiError.details?.forEach((x, i) => {
    result[x.context?.key || i] = x.message;
  });
  return result;
};

function useValidate(
  Schema: Joi.Schema,
  model: object,
  onSubmit: (model: object) => void | null,
  onInvalidSubmit: (
    errors: object,
    joiError: Joi.ValidationError | null,
    model: object
  ) => void | null
) {
  const [currentModel, setCurrentModel] = useState(model);
  const [isValid, setIsValid] = useState(Schema.validate(model));
  const [errors, setErrors] = useState<any | undefined>(undefined);
  const [joiError, setJoiError] = useState<null | Joi.ValidationError>(null);
  const update = (prop: string, value: any) => {
    const newCurrentModel = assign({}, currentModel, { [prop]: value });
    setCurrentModel(newCurrentModel);
  };
  const getError = (prop: string | null) => {
    return !errors ? null : errors[prop === null ? "undefined" : prop];
  };
  const handleSubmit = () => {
    if (!onSubmit) return console.log("no submit defined");
    if (isValid) {
      onSubmit(currentModel);
      console.log("in isvalid");
    } else {
      // onInvalidSubmit
      //   ? onInvalidSubmit(errors, joiError, currentModel)
      //   : (() => {})();
      console.log("in isinvalid");
    }
  };
  useEffect(() => {
    const { error, value } = Schema.validate(currentModel, {
      abortEarly: true
    });
    console.log("value", value);
    setJoiError(error);
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
    ValidationMessageContainer: ValidationMessageContainer({ errors }),
    handleSubmit
  };
}

export default useValidate;
