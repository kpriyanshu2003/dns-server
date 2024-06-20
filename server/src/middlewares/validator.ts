import { createUserValidator } from "../lib/auth";
import { NextFunction, Request, Response } from "express";

const validator = (type: string) => {
  const validators: {
    [key: string]: (req: Request, res: Response, next: NextFunction) => void;
  } = {
    validateSignUp: (req: Request, res: Response, next: NextFunction) => (
      createUserValidator(req.body), next(), catchError(res, next)
    ),
  };

  const validate = validators[type];
  if (!validate) throw new Error(`Validator for type "${type}" not found`);

  return validate;

  function catchError(res: Response, next: NextFunction) {
    return (error: any) => res.status(400).json({ message: error.message });
  }
};

export default validator;
