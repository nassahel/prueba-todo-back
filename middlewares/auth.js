const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (token == null) return res.status(401).json({ message: 'Token no proporcionado' });

    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) return res.status(403).json({ message: 'Token inválido' });

        req.user = user;
        next();
    });
};

const authorizeRole = (role) => (req, res, next) => {
    if (req.user.userType !== role) {
        return res.status(403).json({ message: 'Acceso denegado' });
    }
    next();
};

module.exports = { authenticateToken, authorizeRole };
