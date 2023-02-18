//import eksternal
const express = require("express");
const router = express();
const authRouter = require('./auth_router')

// routing landing page
router.get("/", (req, res) => {
  return res.send("Backend successfully running at home page");
});

// routing auth
router.use('/auth', authRouter)

module.exports = router;
