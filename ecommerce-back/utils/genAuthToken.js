const jwt = require("jsonwebtoken");

const genAuthToken = (user) => {
    let secretKey = process.env.JWT_SECRET_KEY;

    let token = jwt.sign(
        {
            _Id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
        },
        secretKey

    );
    return token;
};

module.exports = genAuthToken;