const express = require("express");
const router = express.Router()
const exchangestController = require("../controllers/exchanges-controller")

router.get('/', exchangestController.exchangestController)
module.exports = router;

