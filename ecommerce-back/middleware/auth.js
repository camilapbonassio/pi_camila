const jwt = require("jsonwebtoken")

/// verify if the user is autenticated

const auth = (req, res, next) => {

    const token = req.header("x-auth-token");

    if(!token) return res.status(401).send("Access denied. NOt authenticated...");

    try{
        const secretKey = process.env.JWT_SECRET_KEY;
        const user = jwt.verify(token, secretKey);

        //add new property 
        req.user = user

        next()
    } catch(ex) {
        res.status(400).send("Access denied. Invalid token")
    }
}

///verifica se é admin

const isAdmin = (req, res, next) => {
    auth(req, res, ()=> {
        if(req.user.isAdmin){
            next()
        }else{
            res.status(403).send("Access denied. Not authorized")
        }
    })
}

module.exports = { auth, isAdmin}