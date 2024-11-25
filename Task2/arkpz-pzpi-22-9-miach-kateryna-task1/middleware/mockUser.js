const User = require('../models/User');

const mockUser = (req, res, next) => {
    req.user = { id: 6, role: User.ROLES.WAREHOUSE_WORKER }; // WAREHOUSE_WORKER  PASICHNIK
    next();
};

module.exports = mockUser;
