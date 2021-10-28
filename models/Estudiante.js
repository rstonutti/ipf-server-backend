const { model, Schema } = require('mongoose');

const EstudianteSchema = new Schema({
    datos_personales: {
        nombre_apellido: {
            type: String,
            required: [true, "El nombre es necesario"]
        },
        edad: {
            type: Number,
            required: [true, "La edad es necesaria"]
        },
        direccion: {
            calle: {
                type: String,
                required: [true, "La calle es necesaria"]
            },
            ciudad: {
                type: String,
                required: [true, "La ciudad es necesaria"]
            }
        },
        dni: {
            type: String,
            unique: [true, "El DNI está duplicado"],
            required: [true, "El DNI es necesario"]
        },
        correo: {
            type: String,
            unique: [true, "El correo está duplicado"],
            required: [true, "El correo es necesario"]
        },
        numero_telefono: [
            {
                type: String,
                unique: [true, "El número de teléfono está duplicado"],
                required: [true, "El número de teléfono es necesario"]
            }
        ],
        genero: { 
            type: Number, min: 0, max: 2 // 0= Hombre , 1 = Mujer , 3 = Otres
        }, 
        nacionalidad: {
            type: String,
            required: [true, "La nacionalidad es necesaria"]
        },
    },
    secundario: {
        institucion: {
            type: String,
            required: [true, "La Institución es necesaria"]
        },
        titulo: {
            type: String,
            required: [true, "El título es necesario"]
        },
    },
    conocimientos_informaticos: {
        type: Boolean,
        required: [true, "Los conocimientos previos son necesarios"]
    },
    estado: {
        type: Boolean,
        default: true
    },
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    }
});

EstudianteSchema.methods.toJSON = function () {
    const { __v, _id, ...estudiante } = this.toObject();
    estudiante.uid = _id;
    return estudiante;
};

module.exports = model('Estudiante', EstudianteSchema);