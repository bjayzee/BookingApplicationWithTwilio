const express = require('express');
const app = express();
require('dotenv').config();
const ejs = require('ejs');
const appointmentRoutes = require('./routes/appointmentRoute')

const scheduler = require('./scheduler/scheduler');

const mongoose = require('mongoose');


app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.listen(3000);
scheduler.start();

app.set("view engine", "ejs");
app.use(express.static("public"));

//db connection

const dbURI = process.env.MONGO_URL;
mongoose.set("strictQuery", true);
mongoose
  .connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) => {
    console.log('server connected');    
    }).catch((err) => console.log(err));

    //home route

    app.get("/", (req, res) =>{
      res.render("home");
    });


    app.use(appointmentRoutes);