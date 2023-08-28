const { createDoctor, createPatient, findDoctorByEmail, findPatientByEmail } = require('./user.controller');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {generateToken} = require('../middlewares/JWT_authware')


const registerDoctor = async (req, res) => {
    const {username, email, role, password, registration } = req.body;

    try {
        const existingUser = await findDoctorByEmail(email);
        if(existingUser) {
            return res.status(409).json({
                success: 0,
                error: "User already exists!"
            });
        }
        // In future we need to add a varification method here to varify the auth data from govt.
        await createDoctor({username, email, password, role, registration});
        res.status(201).json({
            success: 1,
            message: "New user registered successfully!"
        })
    }
    catch(err) {
        console.log("error registering the user: ", err);
        res.status(500).json([{
            error: "An error occured!"
        }])
    }
}

const signInDoctor = async (req, res) => {
    const { email, password } = req.body;

    try {
        const existingUser = await findDoctorByEmail(email);

        if(!existingUser) {
            return res.status(404).json([{
                error: "User doesn't exists!"
            }]);
        }
        bcrypt.compare(password, existingUser.password, (err, result) => {
            if(err){
                console.log('error comparing passwords ', err);
                res.status(500).json([{
                    error: "Something went wrong!"
                }])
            }
            else if(result === true){
                const token = generateToken({id: existingUser.id, username: existingUser.username});
                res.status(200).setHeader('Authorization', `Bearer ${token}`).json([{
                    message: `Token sent successfully!`
                }])
            }
            else {
                res.status(403).json([{
                    error: "Password doesn't match!"
                }])
            }
        })
    }
    catch(err){
        console.log('issue with database!');
        res.status(500).json([{
            error: "Something went wrong!"
        }])
    }
}

module.exports = { registerDoctor, signInDoctor }