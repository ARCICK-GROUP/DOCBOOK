const { registerDoctor, signInDoctor } = require('../../controllers/auth.controller');
const { Router } = require('express');


const userSignin = Router();

userSignin.post('/signup', registerDoctor);
userSignin.post('/signin', signInDoctor);


module.exports = userSignin;