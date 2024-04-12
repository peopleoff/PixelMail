import Joi from "joi";
import { Request, Response, NextFunction } from "express";

export async function sendMailPolicy(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { body } = req;
  const schema = Joi.object({
    email: Joi.object({
      to: Joi.string().email().required(),
      subject: Joi.string().required(),
      templateId: Joi.number().required(),
    }).required(),
    data: Joi.object().required(),
  });
  const options = {
    allowUnknown: true,
    abortEarly: false,
  };
  const { error } = schema.validate(body, options);
  if (error) {
    return res.status(400).json({ error: error.details });
  }
  next();
}
