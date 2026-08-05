const Project = require('../models/Project');


const projectController =async (req, res) => {
    try {
        const projects = await Project.find();
        res.render('projects', {
            projects: projects,
        });
    } catch (error) {
        res.render('error', {error: error});
    }
}

module.exports = {projectController};