const Project = require('../models/Project');



const createProjects = (req, res) => {
    res.render('admins/projects-create')
}

const postProjectController = async (req, res) => {
    try {
        const { name, authors, first_description, description, category } = req.body;


        if (!name || !authors || !first_description || !description || !category) {
            return res.redirect('/projects/create');
        }

        const newProject = new Project({
            name: name,
            authors: authors,
            first_description: first_description,
            description: description,
            category: category
        });

        await newProject.save();
        res.redirect('/projects');
    } catch (err) {
        console.error("error:", err);
        res.redirect('/projects/create');
    }
};



module.exports = {createProjects, postProjectController}