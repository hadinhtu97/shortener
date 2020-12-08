require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require('cors');
const bodyParser = require("body-parser");

const app = express();
const port = 3000;

app.use(cors({ optionsSuccessStatus: 200 }));
app.use(bodyParser.urlencoded({ extended: false }));
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })

app.get('/', (req, res) => res.sendFile(__dirname + "/views/index.html"));

app.listen(port, () => {
    console.log('Your app is listening on port ' + port);
})