const formulario = document.getElementById('formulario');
const inputs = document.querySelectorAll('#formulario input');

const expresiones = {
    codigo: /^[0-9]$/,
    nom: /^[A-Z\s]{2,}$/,
    apeP: /^[A-Z\s]+$/,
    apeM: /^[A-Z\s]+$/,
    telP: /^[0-9]{10}$/,
    telS: /^[0-9]{10}$/,
    correo: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/,
    semestre: /^[0-9]$/
}

const campos = {
    codigo: false,
    nom: false,
    apeP: false,
    apeM: false,
    telP: false,
    telS: false,
    correo: false,
    semestre: false,
}

const validarForm = (e) =>{
    switch (e.target.name){
        case "codigo":
        if(expresiones.codigo.test(e.target.value)){
            campos[codigo] = true;
        }else{
            campos[codigo] = false;
        }
        break;
        case "nom": 
        if(expresiones.nom.test(e.target.value)){
            campos[nom] = true;
        }else{
            campos[nom] = false;
        }
        break;
        case "apeP": 
        if(expresiones.apeP.test(e.target.value)){
            campos[apeP] = true;
        }else{
            campos[apeP] = false;
        }
        break;
        case "apeM": 
        if(expresiones.apeM.test(e.target.value)){
            campos[apeM] = true;
        }else{
            campos[apeM] = false;
        }
        break;
        case "telP": 
        if(expresiones.telP.test(e.target.value)){
            campos[telP] = true;
        }else{
            campos[telP] = false;
        }
        break;
        case "telS": 
        if(expresiones.telS.test(e.target.value)){
            campos[telS] = true;
        }else{
            campos[telS] = false;
        }
        break;
        case "correo": 
        if(expresiones.correo.test(e.target.value)){
            campos[correo] = true;
        }else{
            campos[correo] = false;
        }
        break;
        case "semestre": 
        if(expresiones.semestre.test(e.target.value)){
            campos[semestre] = true;
        }else{
            campos[semestre] = false;
        }
        break;
    }
}
/*
const validarCampo = (expresion, input, campo) =>{
    if(expresion.test(input.value)){
        document.getElementById(`grupo__${campo}`).classList.remove('formulario__grupo-incorrecto')
        document.getElementById(`grupo__${campo}`).classList.add('|')
        document.querySelector(`#grupo__${campo} i`).classList.add('fa-circle-check')
        document.querySelector(`#grupo__${campo} i`).classList.remove('fa-circle-xmark')
        document.querySelector(`#grupo__${campo} .formulario__input-error`).classList.remove('formulario__input-error-activo')
        campos[campo] = true;
    } else{
        document.getElementById(`grupo__${campo}`).classList.add('formulario__grupo-incorrecto')
        document.getElementById(`grupo__${campo}`).classList.remove('formulario__grupo-correcto')
        document.querySelector(`#grupo__${campo} i`).classList.add('fa-circle-xmark')
        document.querySelector(`#grupo__${campo} i`).classList.remove('fa-circle-check')
        document.querySelector(`#grupo__${campo} .formulario__input-error`).classList.add('formulario__input-error-activo')   
        campos[campo] = false;
    }
}
*/
inputs.forEach((input) =>{
    input.addEventListener('keyup', validarForm);
    input.addEventListener('blur', validarForm);
})

formulario.addEventListener('submit', (e) =>{
    e.preventDefault();
    
    /*if(campos.usuario && campos.nombre && campos.correo && campos.telefono){
        formulario.reset()
        document.getElementById('formulario__mensaje-exito').classList.add('formulario__mensaje-exito-activo')
        setTimeout(() =>{
            document.getElementById('formulario__mensaje-exito').classList.remove('formulario__mensaje-exito-activo')
        }, 3000)

        document.querySelectorAll('.formulario__grupo-correcto').forEach((Icono) =>{
            Icono.classList.remove('formulario__grupo-correcto')
        })
    }else{
        document.getElementById('formulario__mensaje').classList.add('formulario__mensaje-activo')
    }*/
})

