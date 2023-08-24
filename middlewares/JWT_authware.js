const jwt = require('jsonwebtoken')

function generateToken(id){
    const token = jwt.sign({id:id}, process.env.JWT_SECRET, {expiresIn: '30d'});
    return token;
}


function authenticateToken(req, res, next) {
    const token = req.header('Authorization');

    if(!token) {
        return res.status(401).json([{
            error:"Token missing!"
        }]);
    }
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