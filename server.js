const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");

const users = require("./routes/api/users");
const companies = require("./routes/api/companies");

const app = express();
// bodyParser middleware
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
app.use(bodyParser.json());

// db config
const db = require("./config/keys").mongoURI;
// connecting to mongo db

mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log("Mongo successfully connected"))
  .catch(err => console.log(err));

//passport middleware
app.use(passport.initialize());
//passport config
require("./config/passport")(passport);

//routes
app.use("/api/users", users);

app.use("/api/companies", companies);
// setting up express server
const port = process.env.PORT || 3001;

app.listen(port, () => console.log(`Server up and running on port ${port} !`));
