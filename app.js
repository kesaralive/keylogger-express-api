var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const basicAuth = require("express-basic-auth");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var logsRouter = require("./routes/logs");

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));



//unauthorized response
const getUnauthorizedResponse = (req) => {
  return req.auth
    ? "Credentials " + req.auth.user + ":" + req.auth.password + " rejected"
    : "No credentials provided ";
};

//basic auth
app.use(
  basicAuth({
    users: { "kesara": "12345" },
    unauthorizedResponse: getUnauthorizedResponse,
  })
);


app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/logs", logsRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
