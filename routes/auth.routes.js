const router = require('express').Router();
const { check } = require('express-validator');

const { validarCampos } = require('../middlewares/validarCampos');
const { login } = require('../controllers/auth.controller');


router.post('/login', [
    check('nombre', 'El nombre de usuario es obligatorio').not().isEmpty(),
    check('contrasenia', 'La contraseña es obligatoria').not().isEmpty(),
    validarCampos
], login);

module.exports = router;