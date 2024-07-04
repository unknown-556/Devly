
function checkWriter(req, res, next) {
    if (req.user.role === 'writer') {
        next();
    } else {
        return res.status(403).json({ message: 'Access forbidden. Only writers allowed.' });
    }
}

export default checkWriter
