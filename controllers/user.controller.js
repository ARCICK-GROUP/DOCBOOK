const bcrypt = require('bcrypt');
const User = require('../models/users');
const sequelize = require('../models/database_connector');


const createUser = async (userData) => {
    const hashedPassword = await bcrypt.hash(userData.password, 10);
    const newUser = await User.create({...userData, password: hashedPassword});
    return newUser;
};


const findUserByEmail = async (email) => {
    return await User.findOne({where: { email }});
};


module.exports = { createUser, findUserByEmail };