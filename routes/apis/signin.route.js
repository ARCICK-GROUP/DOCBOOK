const { RegisterDoctor, RegisterHospital } = require('../../controllers/auth.controller');
const { Router } = require('express');


const userSignin = Router();

userSignin.post('/hospital/signup', RegisterHospital);
userSignin.post('/doctor/signup', RegisterDoctor);


module.exports = userSignin;