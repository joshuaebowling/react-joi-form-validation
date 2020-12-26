/// <reference path="index.d.ts" />
import { useState, useEffect } from "react";
import { assign } from "lodash";
import Joi from "joi";

function useValidate(Schema: Joi.Schema, model) {
  const [currentModel, setCurrentModel] = useState(model);
  const [isValid, setIsValid] = useState(Schema.validate(model));
  const [errors, setErrors] = useState<any | undefined>(undefined);
  const update = (prop, value) => {
    const newCurrentModel = assign({}, currentModel, { [prop]: value });
    setCurrentModel(newCurrentModel);
  };

  useEffect(() => {
    console.log(currentModel);
    const { error, value } = Schema.validate(currentModel);
    //    setErrors(errors);
    console.log(error);
    setIsValid(error === undefined);
  }, [currentModel]);
  return { update, isValid, currentModel };
}

export default useValidate;
