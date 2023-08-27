const { Router } = require('express');


const AppPage = Router();

AppPage.get('/', (req, res) => {
    res.status(200).render('index');
})

AppPage.get('/doctorSignIn', (req,res) => {
    res.status(200).render('doctorReg')
})

module.exports = AppPage;