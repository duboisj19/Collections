const app = require('../../util/configureApi');
const connectDB = require('../../util/db');
const Media = require('../../models/Media');
// const Restaurant = require('../../models/Restaurant');

// app.get('*', require('../../middleware/auth'), (req, res) => {
//   connectDB()
//     .then(() => {
//       const { restaurantId } = req.query;
//       if (!restaurantId) {
//         throw new Error('No document id specified.');
//       }

//       return Review.find({ restaurantId }).sort({ createdAt: -1 });
//     })
//     .then(result => {
//       res.status(200).json({
//         result,
//       });
//     })
//     .catch(err => {
//       res.status(err.statusCode || 500).json({
//         error: err.message,
//       });
//     });
// });

app.post('*', (req, res) => {
    connectDB()
        .then(() => {

            const { title, id, imageUrl, collectionsId, webUrl } = req.body;
            return Media.create({ title, id, imageUrl, collectionsId, webUrl });
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