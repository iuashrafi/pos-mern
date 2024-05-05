const jwt = require("jsonwebtoken");
const { JWT_SECRET_KEY } = process.env;

/**
 *
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @returns
 */
const verifyToken = (req, res, next) => {
  console.log("inside verifyToken middleware... ", req.path);

  // public Routes - array of routes that should skip token verification
  const skipRoutes = ["/api/auth/signin", "/signin"];
  if (skipRoutes.includes(req.path)) {
    return next();
  }

  const specialCases = ["/api/auth/register", "/register"];

  const { token } = req.cookies;

  // if token is empty/null and is specialCase
  if (!token && specialCases.includes(req.path)) {
    // then still allow user to enter the route
    req.decodedToken = null;
    return next();
  } else if (!token) {
    return res.status(401).json({ errorMessage: "Unauthorized" });
  }

  jwt.verify(token, JWT_SECRET_KEY, (err, decodedToken) => {
    if (err) {
      return res.status(401).json({ errorMessage: "Invalid token" });
    }
    // Attach decoded token data to the request object
    req.decodedToken = decodedToken;

    // console.log("decodedToken=", decodedToken);
    next();
  });
};

module.exports = verifyToken;
