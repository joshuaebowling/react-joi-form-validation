import Joi from "joi";

const CreateUser = Joi.object({
  username: Joi.string().required().min(5).max(25)
});

export default CreateUser;
