const User = require('../models/User');

const mockUser = (req, res, next) => {
    req.user = { role: User.ROLES.PASICHNIK }; // id: WAREHOUSE_WORKER  PASICHNIK
    next();
};

module.exports = mockUser;
