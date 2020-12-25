/// <reference path="index.d.ts" />
import { useState, useEffect } from "react";
import { assign } from "lodash";
function useValidate(validate, model) {
  const [currentModel, setCurrentModel] = useState(model);
  const [isValid, setIsValid] = useState(validate());
  const update = (prop, value) => {
    const newCurrentModel = assign({}, currentModel, { prop: value });
    setCurrentModel(newCurrentModel);
  };
  useEffect(() => {
    setIsValid(validate());
  }, [currentModel]);
  return { update, isValid };
}

export default useValidate;
