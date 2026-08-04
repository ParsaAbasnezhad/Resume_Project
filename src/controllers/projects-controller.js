const projectController = (req, res) => {
    res.render('projects', { title: 'projects' });
}

module.exports = {projectController};