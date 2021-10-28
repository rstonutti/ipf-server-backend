const router = require('express').Router();
const { check } = require('express-validator');

const {
    getUser,
    createUser,
    editUser,
    deleteUser
} = require('../controllers/usuario.controller.js');

const {
    existeNombre,
    existeCorreo,
    existeRol,
    existeUsuarioID
} = require('../helpers/validacionesBD.js');

const {
    validarCampos,
    validarJWT,
    adminRole,
    tieneRole
} = require('../middlewares');

router.get('/:id', [
    validarJWT,
    tieneRole('admin_role', 'collaboration_role', 'user_role'),
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existeUsuarioID),
    validarCampos
], getUser);

router.post('/', [
    /* validarJWT, */
    /* tieneRole('admin_role', 'collaboration_role'), */
    check('nombre', 'El nombre de usuario no debe estar vacío').not().isEmpty(),
    check('nombre', 'El nombre de usuario debe tener como minimo 8 caracteres').isLength({ min: 8 }),
    check('nombre').custom(existeNombre),
    check('contrasenia', 'El nombre de usuario no debe estar vacío').not().isEmpty(),
    check('contrasenia', 'El nombre de usuario debe tener como minimo 8 caracteres').isLength({ min: 8 }),
    check('correo', 'El correo no es válido').isEmail(),
    check('correo').custom(existeCorreo),
    /* check('rol').custom(existeRol), */
    validarCampos
], createUser);

router.put('/:id', [
    validarJWT,
    adminRole,
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existeUsuarioID),
    check('nombre', 'El nombre de usuario no debe estar vacío').not().isEmpty(),
    check('nombre', 'El nombre de usuario debe tener como minimo 8 caracteres').isLength({ min: 8 }),
    check('contrasenia', 'El nombre de usuario no debe estar vacío').not().isEmpty(),
    check('contrasenia', 'El nombre de usuario debe tener como minimo 8 caracteres').isLength({ min: 8 }),
    check('correo', 'El correo no es válido').isEmail(),
    check('rol').custom(existeRol),
    //check('estado', 'El estado no es válido').isBoolean(),
    validarCampos
], editUser);

router.put('/:id', [
    validarJWT,
    adminRole,
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existeUsuarioID),
    validarCampos
], deleteUser);

module.exports = router;