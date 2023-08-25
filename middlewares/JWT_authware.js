const jwt = require('jsonwebtoken')

function generateToken(payload){
    const token = jwt.sign({payload}, process.env.JWT_SECRET, {expiresIn: '30d'});
    return token;
}


function authenticateToken(req, res, next) {
    let token = req.header('Authorization');

    if(!token) {
        return res.status(401).json([{
            error:"Token missing!"
        }]);
    }
    token = token.split(" ")[1];
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if(err){
            return res.status(403).json([{
                error: "Invalid token"
            }])
        }
        req.id = decoded.id;
        next();
    });
}

module.exports = {generateToken, authenticateToken};