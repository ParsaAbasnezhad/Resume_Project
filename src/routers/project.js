const express = require("express");
const router = express.Router()
const projectController = require("../controllers/projects-controller")

router.get('/', projectController.projectController)
module.exports = router;

