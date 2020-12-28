/// <reference path="index.d.ts" />
import { useState, useEffect } from "react";
import { assign } from "lodash";
import Joi from "joi";

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

  useEffect(() => {
    const { error, value } = Schema.validate(currentModel);
    //    setErrors(errors);
    const errs = parseErrors(error);
    console.log("errs=", errs);
    setIsValid(error === undefined);
    setErrors(errs);
  }, [currentModel]);

  return { update, isValid, currentModel, errors };
}

export default useValidate;
