const { registerUser, signIn } = require('../controllers/auth.controller');
const { Router } = require('express');


const userSignin = Router();

userSignin.post('/signup', registerUser);
userSignin.post('/signin', signIn);


module.exports = userSignin;