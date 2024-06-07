const {CreateAppointment, CreateHospital, CreateDoctor,
     CreatePatient, CreateTimeTable, 
     ExistingPatient, ExistingHospital, ExistingDoctor
} = require("./user.controller");
// const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');
// const {generateToken} = require('../middlewares/JWT_authware')


const RegisterHospital = async (req, res) => {
    const {name, latitude, longitude, registrationNumber, password } = req.body;

    try {
        const existingUser = await ExistingHospital(registrationNumber);
        if(existingUser) {
            return res.status(409).json({
                success: 0,
                error: "User already exists!"
            });
        }

        // In future we need to add a varification method here to varify the auth data from govt.
        await CreateHospital({name, latitude, longitude, registrationNumber, password});
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

const RegisterDoctor = async (req, res) => {
    // have to send in same var name to avoid errors
    const {name, speciality, registrationNumber, HID} = req.body;
    const docData = {name, speciality, registrationNumber};
    try {
        const existingUser = await ExistingDoctor(registrationNumber);
        if(existingUser) {
            return res.status(409).json({
                success: 0,
                error: "User already exists!"
            });
        }
        await CreateDoctor(docData, HID);
        res.status(201).json({
            success:1,
            message: "New user registered successfully!"
        })
    } 
    catch(err){
        console.log("error registering the user: ", err);
        res.status(500).json([{
            error: "An error occured!"
        }])
    }
}


const RegisterPatient = async (PhoneNumber) => {
    const existingUser = await ExistingPatient(PhoneNumber);
    try {

        if(!existingUser){
            await CreatePatient(PhoneNumber);
        }
    }
    catch(err){
        console.log("error registering the user: ", err);
        res.status(500).json([{
            error: "An error occured!"
        }])
    }
}



// const signInDoctor = async (req, res) => {
//     const { email, password } = req.body;

//     try {
//         const existingUser = await findDoctorByEmail(email);

//         if(!existingUser) {
//             return res.status(404).json([{
//                 error: "User doesn't exists!"
//             }]);
//         }
//         bcrypt.compare(password, existingUser.password, (err, result) => {
//             if(err){
//                 console.log('error comparing passwords ', err);
//                 res.status(500).json([{
//                     error: "Something went wrong!"
//                 }])
//             }
//             else if(result === true){
//                 const token = generateToken({id: existingUser.id, username: existingUser.username});
//                 res.status(200).setHeader('Authorization', `Bearer ${token}`).json([{
//                     message: `Token sent successfully!`
//                 }])
//             }
//             else {
//                 res.status(403).json([{
//                     error: "Password doesn't match!"
//                 }])
//             }
//         })
//     }
//     catch(err){
//         console.log('issue with database!');
//         res.status(500).json([{
//             error: "Something went wrong!"
//         }])
//     }
// }

module.exports = { RegisterDoctor, RegisterHospital, RegisterPatient}