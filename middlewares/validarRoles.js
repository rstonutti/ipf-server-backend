const { response, request } = require('express');

//Verifica que el usuario sea admin.
const adminRole = (req = request, res = response, next) => {

    if (!req.usuario) {
        return res.status(500).json({
            msg: 'Se intenta verificar el role sin validar el token'
        });
    };

    const { nombre, rol } = req.usuario;

    if (rol !== 'admin_role') {
        return res.status(401).json({
            msg: `${nombre} no es Administrador`
        });
    }


    next();

};

//Verifica el rol del usuario.
const tieneRole = (...roles) => {

    return (req = request, res = response, next) => {

        //Verifico que venga un usuario.
        if (!req.usuario) {
            return res.status(500).json({
                msg: 'Se intenta verificar el role sin validar el token'
            });
        };

        //Verifico que tenga el rol necesario para ejecutar esa acción.
        if (!roles.includes(req.usuario.rol)) {
            return res.status(400).json({
                msg: `El servicio requiere alguno de estos roles ${roles}`
            });
        };

        next();
    };
};

module.exports = {
    adminRole,
    tieneRole
};