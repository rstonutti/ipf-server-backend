const { request, response } = require('express');

const ctrlEstudiante = {};

const Estudiante = require('../models/Estudiante.js');

ctrlEstudiante.getAllEstudiantes = async (req = request, res = response) => {
    try {
/*         const estudiante = await Estudiante.find();
        res.json({
            msg: "Los estudiantes inscriptos son:",
            estudiante
        }); */
        /* const { limite = 5, desde = 0} = req.query; */
        const query = { estado: true };

        const [ total, estudiantes ] = await Promise.all([
            Estudiante.countDocuments(query),
            Estudiante.find(query)
                .populate('usuario', 'nombre')
/*                 .skip(Number(desde))
                .limit(Number(limite)) */
        ]);

        res.json({
            total,
            estudiantes
        });
    } catch (error) {
        console.log('Error al mostrar los datos de los estudiantes: ', error);
    }
};

ctrlEstudiante.getEstudiante = async (req = request, res = response) => {
    const { id } = req.params;
    try {
        const estudiante = await Estudiante.findById(id).populate('usuario', 'nombre');
        res.json({
            estudiante
        });
    } catch (error) {
        console.log('Error al mostrar los datos del estudiante: ', error);
    }
};

ctrlEstudiante.postEstudiante = async (req = request, res = response) => {
    const body = req.body;
    try {

        body.usuario = req.usuario._id;

        const estudiante = new Estudiante(body);
        await estudiante.save();
        res.json({
            msg: 'Estudiante agregado exitosamente',
            estudiante
        });
    } catch (error) {
        console.log('Error al guardar los datos del estudiante: ', error);
    };
};

ctrlEstudiante.editEstudiante = async (req = request, res = response) => {
    const { id } = req.params;
    const body = req.body;
    try {
                    
            const inactivo = await Estudiante.findById(id);
    
            if (!inactivo.estado) {
                return res.json({
                    msg: `El estudiante ${id} no existe`
                });
            };
    
            body.usuario = req.usuario._id;
    
            const estudiante = await Estudiante.findByIdAndUpdate(id, body, {new: true})
            res.json({
                msg: "Datos del estudiante actualizados exitosamente",
                estudiante
            });
        
    } catch (error) {
        console.log('Error al actualizar los datos del estudiante: ', error);
    };
};

ctrlEstudiante.deleteEstudiante = async (req = request, res = response) => {
    const { id } = req.params;
    try {
        //Verifico que el estudiante este activo
        const inactivo = await Estudiante.findById(id);

        if (!inactivo.estado) {
            return res.json({
                msg: `El estudiante ${id} no existe`
            });
        };

        const estudiante = await Estudiante.findByIdAndUpdate(id, { estado: false });

        res.json({
            msg: 'Estudiante borrado de la base de datos exitosamente',
            estudiante
        });
    } catch (error) {
        console.log('Error al borrar los datos del estudiante: ', error);
    };
};

module.exports = ctrlEstudiante;