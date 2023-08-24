const express = require('express');
const compression = require('compression');
const {authenticateToken} = require('./middlewares/JWT_authware')
const cors = require('cors');
const sequelize = require('./models/database_connector');


// Route imports
const userSignin = require('./routes/signin.route')
const searchEngine = require('./routes/search.route')


// config
const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || "0.0.0.0";
const app = express();
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use('/api/auth', authenticateToken);


// routes & errorHandlers
app.use('/api/user', userSignin);
app.use('/api/auth/search', searchEngine);


app.use((err, req, res, next) => {
    console.log('An error occurred:', err);
    res.status(500).json({
        error: 'An unexpected error occurred'
    });
});


app.use((req, res) => {
    res.status(404).json([{
        error: "Route not found!"
    }]);
});


sequelize.sync()
    .then(() => {
        app.listen(PORT, HOST, () => {
            console.log(`started app on http://${HOST}:${PORT}/`);
        })
    })
    .catch((err) => {
        console.error('Error in synchronizing the DB : ', err);
    });

