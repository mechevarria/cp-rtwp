module.exports = (req, res) => {
    const name = req.query.name || 'Guest';

    res.json({
        message: `Greetings ${name} from the nodes.js Express server`,
        time: new Date()
    });
};
