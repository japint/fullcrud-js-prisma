export const validate = (schema) => (req, res, next) => {
  const result = schema.safeParse(req.body);
  if (!result.success) {
    // Instead of creating a new Error, pass the original ZodError
    return next(result.error);
  }
  req.body = result.data;
  next();
};
