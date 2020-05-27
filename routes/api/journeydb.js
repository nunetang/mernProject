const express = require("express");
const router = express.Router();
const Itinmodel = require("../../models/journeyModel");


router.get("/itin", (req, res) => {
  Itinmodel.find().then(itin => res.json(itin));
});


router.get("/itin/:cityurl", (req, res) => {
  Itinmodel.find({ cityurl: req.params.cityurl }).then(itin => res.json(itin));
});


router.get("/itinid/:id", (req, res) => {
  Itinmodel.findById(req.params.id).then(itin => res.json(itin));
});


router.post("/itinid/", (req, res) => {
  Itinmodel.find({ _id: { $in: req.body.favid } }).then(itin => res.json(itin));
});


router.post("/itinhashtag/", (req, res) => {
  Itinmodel.find({ hashtag: { $in: req.body.hashtag } }).then(itin =>
    res.json(itin)
  );
});


router.post("/itin", (req, res) => {
  const itinerary = new Itinmodel({
    title: req.body.title,
    rating: req.body.rating,
    duration: req.body.duration,
    price: req.body.price,
    author: req.body.author,
    likes: req.body.likes,
    image: req.body.image,
    cityurl: req.body.cityurl,
    hashtag: req.body.hashtag
  });

  itinerary
    .save()
    .then(doc => {
      res.json(doc);
    })
    .catch(err => {
      console.error(err);
    });
});


module.exports = router;
