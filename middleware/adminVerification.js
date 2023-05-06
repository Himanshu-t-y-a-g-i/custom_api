const jwt = require("jsonwebtoken");

const verify = (req, res, next) => {
    if (req.method === "GET") {
        next();
        return;
    }
    const token = req.headers.authorization;
    const decoded = jwt.verify(token, "custom_api");
    if (token && decoded.isAdmin) {
        console.log(decoded);
        next();
    } else {
        res.status(400).send({ msg: [], response: "admin login required" });
    }
}

module.exports = { verify };