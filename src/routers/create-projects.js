const express = require("express");
const router = express.Router()
const createProjectController = require("../controllers/project-create-controller")


router.get("/create-project", createProjectController.createProjects)

router.post("/create-project/data", createProjectController.postProjectController)


module.exports = router;