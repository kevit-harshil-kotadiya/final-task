import { body, validationResult } from 'express-validator';

export const validateAdminCredentials = () => {
  return [
    body('administratorId').notEmpty().withMessage('Id is required'),
    body('password').notEmpty().withMessage('Password is required'),
    (req, res, next) => {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      next();
    },
  ];
};

export const validateYear = () => {
  return [
    body('year').isNumeric().withMessage('Year must be a number'),
    (req, res, next) => {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      next();
    },
  ];
};

export default validateAdminCredentials;


