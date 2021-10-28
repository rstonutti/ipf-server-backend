const { Estudiante, Role, Usuario } = require('../models');

//Verificamos si el nombre de usuario existe en mi BD.
const existeNombre = async (nombre = '') => {
    const existeNombre = await Usuario.findOne({ nombre });
    if (existeNombre) {

        //Se usa throw new Error cuando se quiere lanzar mensajes personalizados usando express-validator.
        throw new Error(`El nombre de usuario ${nombre} ya está en uso`);

    };
};

//Verificamos si el correo existe en mi BD.
const existeCorreo = async (correo = '') => {
    const existeCorreo = await Usuario.findOne({ correo });
    if (existeCorreo) {
        throw new Error(`El correo ${correo} ya está en uso`);
    };
};

//Verificamos si el rol existe en la BD.
const existeRol = async (rol = '') => {
    const existeRol = await Role.findOne({ rol });
    if (!existeRol) {
        throw new Error(`El rol ${rol} no existe`);
    };
};

//Verificamos si existe un usuario con ese ID. 
//Con esta validación se pueden agregar roles libremente en la base de datos sin modificar mucho código.
const existeUsuarioID = async (id) => {
    const existeUsuario = await Usuario.findById(id);
    if (!existeUsuario) {
        throw new Error(`El id ${id} no existe`);
    };
};

const existeEstudianteID = async (id) => {
    const existeEstudiante = await Estudiante.findById(id);
    if (!existeEstudiante) {
        throw new Error(`El id ${id} no existe`);
    };
};

module.exports = {
    existeNombre,
    existeCorreo,
    existeRol,
    existeUsuarioID,
    existeEstudianteID
};