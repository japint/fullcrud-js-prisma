export const validate =
  ({ body, params, query }) =>
  (req, res, next) => {
    try {
      if (body) {
        const result = body.safeParse(req.body);
        if (!result.success) return next(result.error);
        req.body = result.data;
      }

      if (params) {
        const result = params.safeParse(req.params);
        if (!result.success) return next(result.error);
        req.params = result.data;
      }

      if (query) {
        const result = query.safeParse(req.query);
        if (!result.success) return next(result.error);
        req.query = result.data;
      }

      next();
    } catch (err) {
      next(err);
    }
  };
