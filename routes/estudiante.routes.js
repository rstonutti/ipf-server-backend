const router = require('express').Router();
const { check } = require('express-validator');

const {
    getEstudiante,
    getAllEstudiantes,
    postEstudiante,
    editEstudiante,
    deleteEstudiante
} = require('../controllers/estudiante.controller.js');

const {
    existeEstudianteID
} = require('../helpers/validacionesBD.js');

const {
    validarCampos,
    validarJWT,
    adminRole,
    tieneRole
} = require('../middlewares');

router.get('/', getAllEstudiantes);

router.get('/:id', [
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom( existeEstudianteID ),
    validarCampos,
], getEstudiante);

router.post('/', [
    validarJWT
], postEstudiante);

router.put('/:id', [
    validarJWT,
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom( existeEstudianteID ),
    validarCampos,
], editEstudiante);

router.put('/delete/:id', [
    validarJWT,
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom( existeEstudianteID ),
    validarCampos,
], deleteEstudiante);

module.exports = router;