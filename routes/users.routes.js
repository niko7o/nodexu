const express = require('express');
const router = express.Router();
const usersController = require('../controllers/users.controller');
const authMiddleware = require('../middlewares/auth.middleware');

const multer = require("multer");
const upload = multer({ 
    //dest: './public/images/uploads',
    destination: function (req, file, cb) {
        cb(null, './public/images/uploads/')
    },
    filename: function (req, file, cb) {
        crypto.pseudoRandomBytes(16, function (err, raw) {
            cb(null, raw.toString('hex') + Date.now() + '.' + mime.extension(file.mimetype));
        });
    }
});

router.get(
    '/create', 
    usersController.create
);

router.post(
    '/create',
    upload.single('avatar'),
    usersController.doCreate
);

router.get(
    '/list',
    authMiddleware.isAuthenticated,
    usersController.listUsers
);

router.get(
    '/confirm', 
    usersController.confirm
);

module.exports = router;