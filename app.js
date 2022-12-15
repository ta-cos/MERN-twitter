const mongoose = require("mongoose");
const passport = require('passport');
require('./config/passport')(passport);
const express = require("express");
const routes = require('./routes')
const app = express();
app.use(passport.initialize());

const db = require('./config/keys').mongoURI;
mongoose
    .connect(db, { useNewUrlParser: true })
    .then(() => console.log("Connected to MongoDB successfully"))
    .catch(err => console.log(err));

app.use(express.json());
app.use('/', routes);


const port = process.env.PORT || 8000;
app.listen(port, () => console.log(`Server is running on port ${port}`));
