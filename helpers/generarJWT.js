const jwt = require('jsonwebtoken');

const generarJWT = (uid = '') => {

    //Si utiliza el new Promise para que trabaje en base a promesas
    return new Promise(
        (resolve, reject) => {

            const payload = { uid };

            //Generamos el JWT
            jwt.sign(payload, process.env.SECRETO, {
                expiresIn: '1d'
            }, (err, token) => {
                if (err) {
                    console.log(err);
                    reject('No se puedo generar el token');
                } else {
                    resolve(token);
                }
            });

        }
    );

};

module.exports = {
    generarJWT
};