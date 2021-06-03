const app = require('../../util/configureApi');
const connectDB = require('../../util/db');
const Media = require('../../models/Media');

app.get('*', (req, res) => {
    connectDB()
        .then(() => {
            const { collectionsId } = req.query;
            if (!collectionsId) {
                throw new Error('No collection id specified.');
            }

            return Media.find({ collectionsId });
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