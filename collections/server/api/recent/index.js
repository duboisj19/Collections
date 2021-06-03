const app = require('../../util/configureApi');
const connectDB = require('../../util/db');
const Recent = require('../../models/Recent');
// const Restaurant = require('../../models/Restaurant');

app.get('*', (req, res) => {
    connectDB()
        .then(() => Recent.find())
        .then(result => {
            res.status(200).json({
                result: result,
            });
        })
        .catch(error => {
            res.status(error.statusCode || 500).json({
                error: error.message,
            });
        });
});

app.post('*', (req, res) => {
    connectDB()
        .then(() => {

            const { title, id, imageUrl, webUrl } = req.body;
            return Recent.create({ title, id, imageUrl, webUrl });
        })
        .then(result => {
            res.status(200).json({
                result,
            });
        })
        .catch(err => {
            res.status(err.statusCode || 500).json({
                error: err.message,
            });
        });
});

module.exports = app;