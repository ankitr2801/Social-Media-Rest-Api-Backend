import jwt from "jsonwebtoken";

const jwtAuth = (req, res, next) => {
    const token = req.headers["authorization"];

    if (!token) {
        return res.status(401).send("Unauthorized");
    }

    try {
        const payload = jwt.verify(token, "WL5Fuf1RO83WCiEsP9VcNnYMEYGBiTP7");
        req.userID = payload.userID;
        console.log(payload);
        console.log("req.userID" , req.userID);
    } catch (err) {
        console.log(err);
        return res.status(401).send('Unauthorized');
    }

    next();
};


export  default jwtAuth;
