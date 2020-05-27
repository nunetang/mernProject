const express = require("express");
const router = express.Router();
const passport = require("passport");

//  Load User model
const User = require("../../models/usermodel");
const Itinmodel = require("../../models/journeyModel");
c

router.get(
  "/profileget",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    User.findById(req.user.id)
      // GET FAVORITES BY USER ID
      .then(user => {
        res.json(user);
      })

      .catch(() =>
        res.status(404).json({ User: "There is no user info for this user" })
      );
  }
);


router.post(
  "/profile/postfav/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    User.findOneAndUpdate(
      { _id: req.params.id },
      { $push: { favorites: req.body.favData } }
      // { new: true }
    )
      .then(user => res.json(user.favorites))
      .catch(err => res.status(404).json({ success: false }));
  }
);


router.delete(
  "/profile/removefav/:id/:favid",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    User.findOneAndUpdate(
      { _id: req.params.id },
      { $pull: { favorites: req.params.favid } }
      // { new: true }
    )
      .then(user => {
        res.json(user);
      })
      .catch(err => res.status(404).json({ success: false }));
  }
);

module.exports = router;
