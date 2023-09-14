export const debugMiddleware = (req, res, next) => {
    console.log("Debug Middleware Called");
    console.log("Request Path:", req.path);
    console.log("Request Method:", req.method);
    console.log("Request Headers:", req.headers);
    next();
  };