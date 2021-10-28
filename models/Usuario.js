const { model, Schema } = require('mongoose');

const UsuarioSchema = new Schema({
    nombre: {
        type: String,
        unique: [true, 'El nombre de usuario está duplicado'],
        required: [true, 'El nombre de usuario es necesario']
    },
    contrasenia: {
        type: String,
        required: [true, 'La contraseña es necesaria']
    },
    correo: {
        type: String,
        unique: [true, 'El correo está duplicado'],
        required: [true, 'El correo es necesario']
    },
    rol: {
        type: String,
        default: 'admin_role'
    },
    estado: {
        type: Boolean,
        default: true
    }
});

UsuarioSchema.methods.toJSON = function () {
    const { __v, _id, contrasenia, ...usuario } = this.toObject();
    usuario.uid = _id;
    return usuario;
};

module.exports = model('Usuario', UsuarioSchema);