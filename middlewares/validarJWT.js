const { request, response } = require('express');
const jwt = require('jsonwebtoken');
const Usuario = require('../models/Usuario');

const validarJWT = async (req = request, res = response, next) => {

    //Lee el token del header proveniente de la request
    const token = req.header('x-token');

    //Verifica la existencia del token
    if (!token) {
        return res.status(401).json({
            msg: 'No posee un token'
        })
    }
    try {
        const { uid } = jwt.verify(token, process.env.SECRETO);

        //Leer usuario del UID proveniente del token
        const usuario = await Usuario.findById(uid);

        //Existe usuario BD
        if (!usuario) {
            return res.status(401).json({
                msg: 'Token inválido - No existe usuario'
            })
        }

        //Verificar estado
        if (!usuario.estado) {
            return res.status(401).json({
                msg: 'Token inválido - Estado false'
            })
        }

        //Guardo los datos del usuario
        req.usuario = usuario;

        next();

    } catch (error) {

        console.log(error);
        
        res.status(401).json({
            msg: 'Token inválido'
        })
    }
};

module.exports = {
    validarJWT
}