const controller = {};

controller.index = (req, res) => {
    res.render('./techno/index.ejs', {
        title: 'Technologie'
    });
};

module.exports = controller;