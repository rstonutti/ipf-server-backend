//Se crea un archivo index porque al importar la carpeta "Middlewares" la exportación por si misma va a buscar el index
//y nos ahorramos un poco más de código

const validarCampos = require('../middlewares/validarCampos.js');
const validarJWT = require('../middlewares/validarJWT.js');
const validarRoles = require('../middlewares/validarRoles.js');

//Utilizamos el spread porque entonces se exporta todo lo que venga de cada archivo.

module.exports = {
    ...validarCampos,
    ...validarJWT,
    ...validarRoles
};