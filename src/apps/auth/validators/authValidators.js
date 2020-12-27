import { body, validationResult } from 'express-validator';

export const authValidateRules = () => {
  return [
    body('username').not().isEmpty().withMessage('Username must have more than 8 characters'),
    body('username').isLength({ min: 8 }).withMessage('Username must have more than 8 characters'),

    body('email').isEmail().withMessage('Email format is invalid'),
    body('password').isLength({ min: 8 }).withMessage('Password must have more than 8 characters'),
  ]
}

export const validate = (req, res, next) => {
  const errors = validationResult(req)
  if (errors.isEmpty()) {
    return next()
  }
  const extractedErrors = []
  errors.array().map(err => extractedErrors.push({ [err.param]: err.msg }))

  return res.status(422).json({
    errors: extractedErrors,
  })
}