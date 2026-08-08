const Project = require('../models/Project');


const projectController = async (req, res) => {
    try {
        const projects = await Project.find().sort({ createdAt: -1 }).lean();
        res.render('projects', {
            projects: projects,
            title: 'Projects'
        });
    } catch (error) {
        console.error(error);
        res.render('error', {
            error: 'Failed to load projects. Please try again later.'
        });
    }
}

module.exports = {projectController};