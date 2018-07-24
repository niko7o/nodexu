const express = require('express');
const router = express.Router();
const usersController = require('../controllers/users.controller');
const authMiddleware = require('../middlewares/auth.middleware');

const multer = require('multer');
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/images/uploads')
    },
    filename: (req, file, cb) => {
        cb(null, file.filename)
    }
});
const upload = multer({ storage: storage });

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