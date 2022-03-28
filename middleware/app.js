const jwt = require('jsonwebtoken');

const secret = "gRxFBBkGVtxaNrkGQwo/A5uqaTPjw2SNljeQDKZ/NyDi5PiPZ8J084SugxngSdAYdOe0ZZ6/bloKPy56hAxANhMff42YEErYtKGyzoD0JirlLBU2+cKQrpUagmmNrG5AXBHYSgHYYDZwaqCKf1IKqXh28S6Tjd9pUQPH9MIdG0rUBImkAKF4Jde4lZ1IAKjtUmg/HUtngYbCgLmlEljI2xJeWA3/vajf0v/R4/naNAAMSxtil1uUiDi2XxzKKC4RdQmT7WsKd7CwnsbhJG2sDDfoFocS+KZxmz/KnVJH91696ZNz47NcDiqUDJnUERy0oDdSZ/Qb5hBxykD+7g7e5w==";
const auth = (req, res, next) => {

    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    console.log(token);
    if (token == null) return res.sendStatus(401);

    const data = jwt.verify(token, secret, (err, user) => {
        if (err) return res.sendStatus(403);

        console.log(user);

        next();
    });

}
module.exports = { auth, secret };