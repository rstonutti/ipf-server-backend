const { model, Schema } = require('mongoose');

const RoleSchema = new Schema({
    rol: {
        type: String,
        required: [true, 'El rol del usuario es necesario']
    },
});

module.exports = model('Role', RoleSchema);