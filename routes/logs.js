var express = require("express");
var router = express.Router();
const basicAuth = require("express-basic-auth");

//unauthorized response
const getUnauthorizedResponse = (req) => {
  return req.auth
    ? "Credentials " + req.auth.user + ":" + req.auth.password + " rejected"
    : "No credentials provided ";
};

//basic auth
router.use(
  basicAuth({
    users: { "kesara":"12345" },
    unauthorizedResponse: getUnauthorizedResponse,
  })
);

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

module.exports = router;
