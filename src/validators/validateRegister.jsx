import Joi from "joi";

const registerSchema = Joi.object({
  email: Joi.string()
    .email({ tlds: false })
    .required()
    .messages({
      "string.empty": "email is required",
      "string.email": "email must be a valid email"
    }),
  password: Joi.string()
    .alphanum()
    .trim()
    .min(6)
    .required()
    .messages({
      "string.empty": "password is required",
      "string.alphanum":
        "password must contain number or alphabet",
      "string.min":
        "password must have at least 6 characters"
    })
});

export default function validateRegister(input) {
  const { error } = registerSchema.validate(input, {
    abortEarly: false
  });

  if (error) {
    const result = error.details.reduce((acc, el) => {
      acc[el.path[0]] = el.message;
      return acc;
    }, {});
    return result;
  }
}
