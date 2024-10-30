const allowedOrigins = ["*", "http://localhost:3000"];

const credentials = (req, res, next) => {
  const origin = req.headers.origin;
  if (allowedOrigins.includes("*") || allowedOrigins.includes(origin)) {
    res.header("Access-Control-Allow-Credentials", true);
  }
  next();
};
const corsOptions = {
  origin: (origin, callback) => {
    if (
      allowedOrigins.indexOf(origin) !== -1 ||
      allowedOrigins.includes("*") ||
      !origin
    ) {
      callback(null, true);
    } else callback(new Error("Not allowed by CORS"));
  },
  optionsSuccessStatus: 200,
};
module.exports = { credentials, corsOptions };
