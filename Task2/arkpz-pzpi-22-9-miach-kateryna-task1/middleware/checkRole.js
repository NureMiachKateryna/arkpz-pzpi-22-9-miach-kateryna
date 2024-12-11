const checkRole = (requiredRole) => (req, res, next) => {
    const userRole = req.user.role;  // Убедитесь, что req.user существует
    if (userRole !== requiredRole) {
        return res.status(403).json({ error: 'Доступ заборонено' });
    }
    next();
};

module.exports = checkRole;