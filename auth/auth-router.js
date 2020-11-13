const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Users = require("./users-model");

router.post("/register", async (req, res, next) => {
  const { username, password } = req.body;
  const hash = await bcrypt.hash(password, 12);
  try {
    const user = await Users.findByUsername(username);
    if (user) {
      res.status(409).json({ message: "username already exists" });
    }

    const newUser = await Users.add({
      username,
      password: hash,
    });
    res.status(201).json(newUser);
  } catch (err) {
    next(err);
  }
});

router.post("/login", async (req, res, next) => {
  const { username, password } = req.body;
  try {
    const user = await Users.findByUsername(username);
    if (!user) {
      return res.status(401).json({ message: "invalid credentials" });
    }

    const passwordValid = await bcrypt.compare(password, user.password);
    if (!passwordValid) {
      return res.status(401).json({ message: "invalid credentials" });
    }

    const token = jwt.sign({ userID: user.id }, "secret token");
    res.cookie("token", token);

    res.json({ message: `welcome, ${user.username}` });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
