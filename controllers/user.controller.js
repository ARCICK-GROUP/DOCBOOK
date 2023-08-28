const bcrypt = require('bcrypt');
const { Doctor, Patient } = require('../models/users');
const sequelize = require('../models/database_connector');


const createDoctor = async (userData) => {
    const hashedPassword = await bcrypt.hash(userData.password, 10);
    const newDoctor = await Doctor.create({...userData, password: hashedPassword});
    return newDoctor;
};


const createPatient = async (userData) => {
    const hashedPassword = await bcrypt.hash(userData.password, 10);
    const newPatient = await Patient.create({...userData, password: hashedPassword});
    return newPatient;
};


const findDoctorByEmail = async (email) => {
    return await Doctor.findOne({where: { email }});
};

const findPatientByEmail = async (email) => {
    return await Patient.findOne({where: { email }});
};



module.exports = { createDoctor, createPatient, findDoctorByEmail, findPatientByEmail };