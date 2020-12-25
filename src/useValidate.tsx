/// <reference path="index.d.ts" />
import { useState, useEffect } from "react";

function useValidate(validate, model) {
  const [currentModel, setCurrentModel] = useState(model);
  const [isValid, setIsValid] = useState(validate());
  useEffect(() => {
    setIsValid(validate());
  }, [currentModel]);
}

export default useValidate;
