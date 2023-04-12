const db = require("../models");
const User = db.user;

exports.getUsers = (req, res) => {
  User.find()
    .then((users) => {
      res.status(200).json(users);
    })
    .catch((error) => {
      res.status(400).send(error);
    });
};
