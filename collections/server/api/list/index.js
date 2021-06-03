const app = require('../../util/configureApi');
const connectDB = require('../../util/db');
const Collections = require('../../models/Collections');

app.get('*', (req, res) => {
    connectDB()
        .then(() => Collections.find())
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