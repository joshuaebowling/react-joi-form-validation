import Joi from "joi";

const CreateUser = Joi.object({
  username: Joi.string().required().min(5).max(25),
  password: Joi.string().required().min(8).max(16),
  confirmPassword: Joi.string().required().equal(Joi.ref("password")),
  random: Joi.string().required(),
  signal: Joi.string().empty("").min(10).max(10),
  telegram: Joi.string().empty("").min(10).max(10)
}).or("signal", "telegram");

export default CreateUser;
