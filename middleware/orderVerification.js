

const verifyOrder = (req, res, next) => {
    const token = req.headers.authorization;
    const decoded = jwt.verify(token, "custom_api");
    if (token && decoded) {
    }
    next();
}

module.exports = { verifyOrder }