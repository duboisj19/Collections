const jwt = require('jsonwebtoken');
const app = require('../../util/configureApi');
const connectDB = require('../../util/db');
const User = require('../../models/User');
const config = require('../../config');

app.post('*', (req, res) => {
    let finalUser;
    connectDB()
        .then(() => {
            if (!(req.body.password === req.body.confirmPassword)) {
                throw new Error('Passwords do not match!');
            }
            return User.create({
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email,
                password: req.body.password,
            });
        })
        .then(user => {

            finalUser = user;

        })
        .then(user => {
            res.status(200).json({
                result: finalUser,
            });
        })
        .catch(err => {
            res.status(err.statusCode || 500).json({
                error: err.message,
            });
        });
});

module.exports = app;