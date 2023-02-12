
const conexion = require("./DBconexion")
const multer = require('multer')
const path = require('path')
const nodemailer = require("nodemailer")
const { google } = require('googleapis')
const Swal = require('sweetalert2')
const jsdom = require('jsdom')
const bcryptjs = require('bcryptjs')
const session = require('express-session')
const $ = require('jquery')(new jsdom.JSDOM().window);


/* Registro de usuarios a la base de datos */
exports.registroUsuario = (req, res) => {
    var insertarUsuario = "INSERT INTO alumnos (codigo, nombre, apeP, apeM, telP, telS, correo, carrera, semestre) VALUES (?,?,?,?,?,?,?,?,?)"
    var datos = new Array(9);
    var correo = req.body.mail.toLowerCase();
    datos[0] = req.body.codigo;
    datos[1] = req.body.nom;
    datos[2] = req.body.apeP;
    datos[3] = req.body.apeM;
    datos[4] = req.body.telP;
    datos[5] = req.body.telS;
    datos[6] = correo;
    datos[7] = req.body.carrera;
    datos[8] = req.body.semestre;

    usuario = req.body.codigo;
    passUsuario = req.body.telP;


    conexion.query(insertarUsuario, datos, (error, result) => {
        if (error) {
                console.log('[INSERT ERRROR] - ', error.message);
                console.log('El usuario ya existe!')
                res.render('formulario', {
                    alert: true,
                    alertTitle: "Registro",
                    alertMessage: "El usuario que intentas registrar ya existe!",
                    alertIcon: 'error',
                    showConfirnButton: true,
                    ruta: ''
                })
        } else {
            const codigo = req.body.codigo;
            conexion.query("SELECT * FROM alumnos WHERE codigo = ?", [codigo], (error, result) => {
                if (error) {
                    throw error
                } else {
                    res.render('subirArchivos', { user: result[0] })
                }
            })
        }
    })
}

/* Definiendo el nombre persolnalizado para los archivos subidos al servidor */
const diskStorage = multer.diskStorage({
    destination: path.join(__dirname, "../Documentos"),
    filename: (req, file, cb) => {
        const nombreArchivo = req.body.codigo
        cb(null, `${nombreArchivo} - ${file.originalname}`)
    }
})

/* Guardar archivos en la carpeta Documentos del servidor */
exports.uploadArchivos = multer({ storage: diskStorage }).fields([
    { name: 'solicitud', maxCount: 1 },
    { name: 'ine', maxCount: 1 },
    { name: 'curp', maxCount: 1 },
    { name: 'domicilio', maxCount: 1 },
    { name: 'edoCuenta', maxCount: 1 },
    { name: 'ingresos', maxCount: 1 },
    { name: 'fiscal', maxCount: 1 },
])

/* Cargando archivos a la base de datos */
exports.MySQL_uploadArchivos = (req, res) => {
    const alumnos_codigo = req.body.codigo;


    var nombreArchivo = req.files['solicitud'][0].filename;
    var tipoArchivo = req.files['solicitud'][0].mimetype;

    conexion.query('INSERT INTO documentos SET ?', [{ nombreArchivo, tipoArchivo, alumnos_codigo }],
        (error, rows) => {
            if (error) {
                return error
            } else {
                var nombreArchivo = req.files['ine'][0].filename;
                var tipoArchivo = req.files['ine'][0].mimetype;
                console.log('Variable nombre: ', nombreArchivo)
                console.log('Variable tipo: ', tipoArchivo)
                console.log('Solicitud cargada!')

                conexion.query('INSERT INTO documentos SET ?', [{ nombreArchivo, tipoArchivo, alumnos_codigo }],
                    (error, rows) => {
                        if (error) {
                            return error
                        } else {
                            var nombreArchivo = req.files['curp'][0].filename;
                            var tipoArchivo = req.files['curp'][0].mimetype;
                            console.log('Variable nombre: ', nombreArchivo)
                            console.log('Variable tipo: ', tipoArchivo)

                            conexion.query('INSERT INTO documentos SET ?', [{ nombreArchivo, tipoArchivo, alumnos_codigo }],
                                (error, rows) => {
                                    if (error) {
                                        return error
                                    } else {
                                        var nombreArchivo = req.files['domicilio'][0].filename;
                                        var tipoArchivo = req.files['domicilio'][0].mimetype;
                                        console.log('Variable nombre: ', nombreArchivo)
                                        console.log('Variable tipo: ', tipoArchivo)

                                        conexion.query('INSERT INTO documentos SET ?', [{ nombreArchivo, tipoArchivo, alumnos_codigo }],
                                            (error, rows) => {
                                                if (error) {
                                                    return error
                                                } else {
                                                    var nombreArchivo = req.files['edoCuenta'][0].filename;
                                                    var tipoArchivo = req.files['edoCuenta'][0].mimetype;
                                                    console.log('Variable nombre: ', nombreArchivo)
                                                    console.log('Variable tipo: ', tipoArchivo)

                                                    conexion.query('INSERT INTO documentos SET ?', [{ nombreArchivo, tipoArchivo, alumnos_codigo }],
                                                        (error, rows) => {
                                                            if (error) {
                                                                return error
                                                            } else {
                                                                var nombreArchivo = req.files['ingresos'][0].filename;
                                                                var tipoArchivo = req.files['ingresos'][0].mimetype;
                                                                console.log('Variable nombre: ', nombreArchivo)
                                                                console.log('Variable tipo: ', tipoArchivo)

                                                                conexion.query('INSERT INTO documentos SET ?', [{ nombreArchivo, tipoArchivo, alumnos_codigo }],
                                                                    (error, rows) => {
                                                                        if (error) {
                                                                            return error
                                                                        } else {
                                                                            var nombreArchivo = req.files['fiscal'][0].filename;
                                                                            var tipoArchivo = req.files['fiscal'][0].mimetype;
                                                                            console.log('Variable nombre: ', nombreArchivo)
                                                                            console.log('Variable tipo: ', tipoArchivo)

                                                                            conexion.query('INSERT INTO documentos SET ?', [{ nombreArchivo, tipoArchivo, alumnos_codigo }],
                                                                                (error, rows) => {
                                                                                    if (error) {
                                                                                        return error
                                                                                    } else {
                                                                                        console.log('ARCHIVOS CARGADOS CORRECTAMENTE!!')
                                                                                        res.render('principal', {
                                                                                            alert: true,
                                                                                            alertTitle: "Registro Correcto!",
                                                                                            alertMessage: "El registro se ha realizado correctamente!",
                                                                                            alertIcon: 'success',
                                                                                            showConfirnButton: false,
                                                                                            time: 2000,
                                                                                            ruta: ''
                                                                                        })
                                                                                    }
                                                                                })
                                                                        }
                                                                    })
                                                            }
                                                        })
                                                }
                                            })
                                    }
                                })
                        }
                    })
            }
        })

}

/* validando el Login del administrador */
exports.loginAdmin = async (req, res) => {
    var usuario = req.body.correo;
    var pass = req.body.password;
    let passwordHaash = await bcryptjs.hash(pass, 8);

    if (usuario && pass) {
        conexion.query('SELECT * FROM administrador WHERE correo = ?', [usuario], async (error, result) => {
            if (error) {
                throw error
            } if (result.length == 0 || !(await bcryptjs.compare(pass, result[0].pass))) {
                res.render('loginAdmin', {
                    alert: true,
                    alertTitle: "Login Incorrecto!",
                    alertMessage: "Usuario Y/O contraseña incorrecto",
                    alertIcon: 'error',
                    showConfirnButton: true,
                    time: false,
                    ruta: ''
                })
            } else {
                req.session.loggedin = true;
                req.session.usuario = result[0].correo; 
                res.redirect('/adminPrincipal')
            }
            res.end();
        });

    } else {
        res.send('Please enter Username and Password!');
        res.end();
    }

}

/* Ver todos los registros de usuarios en la base de datos */
exports.verRegistros = (req, res) => {
    const filtro = req.body.filtro
    conexion.query("SELECT * FROM alumnos WHERE estado = ?", [filtro], (error, result) => {
        if (req.session.loggedin) {
            res.render('adminPrincipal', { result: result, login: true, name: req.session.usuario })
        }else{
            res.render('logout', {login: false})
        }
    })
}

/* Ver un registros en especificos */
exports.validar = (req, res) =>{
    const codigo = req.params.codigo;
    conexion.query("SELECT * FROM alumnos WHERE codigo = " + [codigo], (error, result) =>{
        if(error){
            throw error
        }else{
            if (req.session.loggedin) {
                res.render('validar', {user:result[0], login: true, name: req.session.usuario})
            } else {
                res.render('logout', {login: false})
            }
        }
    })
}

/* Ver documentos de un registros */
exports.verDoc = (req, res) => {
    const alumnos_codigo = req.params.codigo;
    const codigo = req.params.codigo;
    conexion.query("SELECT * FROM documentos, alumnos WHERE alumnos_codigo = ? AND codigo = ? AND validarArchivo = 'PENDIENTE'", [alumnos_codigo, codigo], (error, result) => {
        if (error) {
            throw error
        } else {
            if (req.session.loggedin) {
                res.render('verDoc', { result: result, login: true, name: req.session.usuario })
                console.log(result[0])
            } else {
                res.render('logout', {login: false})
            }
        }
    })
}

/* Ver documentos NO validados */
exports.verDocPendientes = (req, res) => {
    const alumnos_codigo = req.params.alumnos_codigo;
    const codigo = req.params.codigo;
    conexion.query("SELECT * FROM documentos, alumnos WHERE alumnos_codigo = ? AND codigo = ? AND validarArchivo = 'PENDIENTE'", [alumnos_codigo, codigo], (error, result) => {
        if (error) {
            throw error
        } else {
            if (req.session.loggedin) {
                res.render('verDoc', { result: result, login: true, name: req.session.usuario })
            } else {
                res.render('logout', {login: false})
            }
            
        }
    })
}

/* Ver y validar un documento */
exports.documento = (req, res) => {
    const nombreArchivo = req.params.nombreArchivo;
    conexion.query('SELECT * FROM documentos WHERE nombreArchivo = ?', [nombreArchivo], (error, result) =>{
        if (error) {
            throw error
        }else{
            if (req.session.loggedin) {
                res.render('validarDocumento', {user: result[0], login: true, name: req.session.usuario})    
            } else {
                res.render('logout', {login: false})
            }
        }
    })
}

exports.validarDocumentos = (req, res) => {

    var codigo = req.body.codigo;
    var validar = req.body.validar;
    var archivo = req.body.archivo;
    conexion.query('UPDATE doc_alumnos SET validarDoc = ? WHERE archivo = ?', [validar, archivo], (error, result) => {
        if (error) {
            throw error
        } else {
            console.log(archivo + " => " + validar)
            console.log("Archivos validados!")
            res.redirect(`/verDoc/${codigo}`)
        }
    })
}

/* Sentencia para enviar comantarios por cada documento */
exports.enviarComentarios = (req, res) => {
    var alumnos_codigo = req.body.para;
    var nombreArchivo = req.body.nombreArchivo;
    var observaciones = req.body.observaciones;
    var validarArchivo = req.body.validar;
    conexion.query('UPDATE documentos SET validarArchivo = ?, observaciones = ? WHERE nombreArchivo = ?', [validarArchivo, observaciones, nombreArchivo], (error, result) => {
        if (error) {
            throw error
        } else {
            console.log('Mensaje enviado!')
            console.log('Mensaje: ', observaciones)
            res.redirect(`/verDocPendientes/${alumnos_codigo}`)
        }
    })
}

/* Sentencia para enviar correo mediante OAuth2 */
exports.enviarCorreo = (req, res) => {
    const conexion = require("./DBconexion")
    const alumnos_codigo = req.body.codigo;
    const origen = req.body.origen;
    const destino = req.body.destino;
    const asunto = req.body.asunto;
    const mensaje = req.body.mensaje;

    const contenidoHTML = `
        
    `;

    const CLIENT_ID = "314708109403-5ho65la3dbt0jrrahosn48hj05at5q20.apps.googleusercontent.com";
    const CLIENT_SECRET = "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";
    const REFRESH_TOKEN = "1//04DywHSrbYXcDCgYIARAAGAQSNwF-L9IrvklJqxuVwwZbsCNBbOtVD_puabCnHEZgJ_uCLmYaMjOjSMpKajHx9IVYlM4uYcPOwF4";
    const REDIRECT_URI = "https://developers.google.com/oauthplayground";

    const oAuth2Cliente = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI)
    oAuth2Cliente.setCredentials({ refresh_token: REFRESH_TOKEN })

    async function correo() {
        try {
            const AccessToken = await oAuth2Cliente.getAccessToken()
            const transporter = nodemailer.createTransport({
                service: "gmail",
                auth: {
                    type: "OAuth2",
                    user: "soporte.cutbecas@gmail.com",
                    clientId: CLIENT_ID,
                    clientSecret: CLIENT_SECRET,
                    refreshToken: REFRESH_TOKEN,
                    accessToken: AccessToken,
                },
            })
            const mailOption = {
                from: `BecasCUT <${origen}>`,
                to: destino,
                subject: asunto,
                html: mensaje,
            }

            const resultado = await transporter.sendMail(mailOption)
            return resultado
        } catch (error) {
            console.log(error)
        }
    }

    correo().then(resultado => res.status(200).send("ENVIADO!")).catch(error => console.log(error.message))
    /* conexion.query("UPDATE alumnos SET estado = 'REVISADO' WHERE codigo = ?", [alumnos_codigo], (err, result) => {
        if (err) {
            throw err
        }else{
            console.log(alumnos_codigo)
            console.log("status: REVISADO")
            res.redirect('/adminPrincipal')
        }
    }) */
}

/* Sentencia para registrar un nuevo usuario Administrador */
exports.registrarAdmin = async (req, res) => {
    const correo = req.body.correo;
    const pass = req.body.password;
    let passwordHaash = await bcryptjs.hash(pass, 8);
    conexion.query('INSERT INTO administrador SET ?', { correo: correo, pass: passwordHaash }, async (error, results) => {
        if (error) {
            console.log(error)
        } else {
            res.render('loginAdmin', {
                alert: true,
                alertTitle: "Registro",
                alertMessage: "REGISTRO CORRECTO!",
                alertIcon: 'success',
                showConfirnButton: false,
                time: 1500,
                ruta: ''
            })
        }
    })
}

/* Validar login de un usuario general */
exports.loginUser = (req, res) => {
    var codigo = req.body.user;
    var pass = req.body.pass;

    if (codigo && pass) {
        conexion.query('SELECT * FROM usuarios WHERE usuario = ? AND pass = ?', [codigo, pass], (error, result, fields) => {
            if (error) {
                throw error
            } if (result.length > 0) {
                res.render('usuarios')
            } else {
                res.send('Incorrect Username and/or Password!');
            }
            res.end();
        });

    } else {
        res.send('Please enter Username and Password!');
        res.end();
    }

}


 
