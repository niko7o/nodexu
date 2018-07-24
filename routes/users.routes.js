const express = require('express');
const router = express.Router();
const usersController = require('../controllers/users.controller');

const authMiddleware = require('../middlewares/auth.middleware');

router.get('/create', usersController.create);
router.post('/create', usersController.doCreate);

router.get(
    '/list',
    authMiddleware.isAuthenticated,
    usersController.listUsers
);

router.get('/confirm', usersController.confirm);

module.exports = router;
