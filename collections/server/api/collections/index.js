const app = require('../../util/configureApi');
const connectDB = require('../../util/db');
const Collections = require('../../models/Collections');

app.post('*', (req, res) => {
    connectDB()
        .then(() => {

            const { title, description } = req.body;
            console.log(title);
            return Collections.create({ title, description });
        })
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

module.exports = app;