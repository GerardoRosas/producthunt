export default function validarCrearProducto(valores){
    let errores = {};

    //Validar el nombre del usuario
    if(!valores.nombre){
        errores.nombre = "El nombre es obligatorio";
    }

    //Validar empresa
    if(!valores.empresa){
        errores.empresa = "Nombre de Emoresa es obligatorio"
    }

    //Validar URL
    if(!valores.url){
        errores.url = "La URL es obligatoria"
    }else if(!/^(ftp|http|https):\/\/[^ "]+$/.test(valores.url)){
        errores.url = "URL no válida"
    }

    //Validar descripccion
    if(!valores.descripcion){
        errores.descripcion = "Agrega un descripción de tu producto";
    }

    return errores;
}