import { validationResult } from "express-validator";

/**
 * @param request
 * @param response
 * @param next
 */
export function validateNewUserRequest(request, response, next) {
  const errors = validationResult(request);
  console.log("errors", errors);
  if (!errors.isEmpty()) {
    return response.status(400).json({ errors: errors.array() });
  }

  return next();
}
