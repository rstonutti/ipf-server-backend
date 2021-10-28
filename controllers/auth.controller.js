const { request, response } = require('express');
const { generarJWT } = require('../helpers/generarJWT');

const bcryptjs = require('bcryptjs');

const Usuario = require('../models/Usuario');

//Controlador para logearse
const login = async (req = request, res = response) => {

    const { nombre, contrasenia } = req.body;

    try {

        const usuario = await Usuario.findOne({ nombre });

        //Existe el usuario
        if (!usuario) {
            return res.status(400).json({
                msg: 'El usuario o contraseña inválido - Usuario no existe'
            });
        };

        //El usuario está activo
        if (!usuario.estado) {
            return res.status(400).json({
                msg: 'El usuario o contraseña inválido - Usuario inactivo'
            });
        };

        //Verificar contraseña
        const contraseñaValida = bcryptjs.compareSync(contrasenia, usuario.contrasenia);
        if (!contraseñaValida) {
            return res.status(400).json({
                msg: 'El usuario o contraseña inválido - Contraseña inválida'
            });
        };

        //Generar JWT 
        const token = await generarJWT(usuario.id);

        res.json({
            msg: 'Inicio de sesión exitoso',
            usuario,
            token
        });

    } catch (error) {
        return res.status(500).json({
            msg: 'Error al iniciar sesión'
        })
    };

};

module.exports = {
    login
};