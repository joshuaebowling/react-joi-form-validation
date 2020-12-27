import Joi from "joi";

const CreateUser = Joi.object({
  username: Joi.string().required().min(5).max(25),
  password: Joi.string().required().min(8).max(16),
  confirmPassword: Joi.string().required().equal(Joi.ref("password")),
  random: Joi.string().required()
});

export default CreateUser;
