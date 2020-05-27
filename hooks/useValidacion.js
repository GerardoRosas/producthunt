import React, { useState, useEffect } from 'react';

const useValidacion = (stateInicial, validar, fn) => {

    const [ valores, guardaValores ] = useState(stateInicial);
    const [ errores, guardarErrores ] = useState({});
    const [ submitForm, guardarSubmitForm ] = useState(false);

    useEffect(() => {
        if(submitForm){
            const noErrores = Object.keys(errores).length === 0;
            if(noErrores){
                fn();
            }
            guardarSubmitForm(false);
        }
    }, [errores])


    //Funcion que se ejecuta conforme el usuario escribe algo
    const handleChange = e => {
        guardaValores({
            ...valores,
            [e.target.name] : e.target.value
        })
    }

    //Funcion que se ejecuta cuando el usuario hace submit
    const handleSubmit = e => {
        e.preventDefault();
        const erroresvalidacion = validar(valores);
        guardarErrores(erroresvalidacion);
        guardarSubmitForm(true);
    }

    //Cuando se realiza el evento
    const handleBlur = () => {
        const erroresvalidacion = validar(valores);
        guardarErrores(erroresvalidacion);
    }

    return{
        valores,
        errores,
        handleChange,
        handleSubmit,
        handleBlur
    }
}
 
export default useValidacion;