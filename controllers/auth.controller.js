const { createUser, findUserByEmail } = require('./user.controller');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {generateToken} = require('../middlewares/JWT_authware')


const registerUser = async (req, res) => {
    const {username, email, role, password, authorizer } = req.body;

    try {
        const existingUser = await findUserByEmail(email);
        if(existingUser) {
            return res.status(409).json([{
                error: "User already exists!"
            }]);
        }
        // In future we need to add a varification method here to varify the auth data from govt.
        await createUser({username, email, password, role, authorizer});
        res.status(201).json([{
            message: "New user registered successfully!"
        }])
    }
    catch(err) {
        console.log("error registering the user: ", err);
        res.status(500).json([{
            error: "An error occured!"
        }])
    }
}

const signIn = async (req, res) => {
    const { email, password } = req.body;

    try {
        const existingUser = await findUserByEmail(email);

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

module.exports = { registerUser, signIn }