const express = require("express");
const router = express.Router();
const Citymodel = require("../../models/citymodel");


router.get("/city", (req, res) => {
  Citymodel.find().then(city => res.json(city));
});


router.post("/city", (req, res) => {
  const city = new Citymodel({
    cityname: req.body.cityname,
    country: req.body.country,
    url: req.body.url,
    id: req.body.id
  });
  city
    .save()
    .then(doc => {
      console.log(doc);
      res.json(doc);
    })
    .catch(err => {
      console.error(err);
    });
});

module.exports = router;
