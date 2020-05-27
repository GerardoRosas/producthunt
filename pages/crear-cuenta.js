import React, { Fragment, useState } from 'react';
import { css } from '@emotion/core';
import Layout from '../components/layout/Layout';
import Router from 'next/router';
import { Formulario, Campo, InputSubmit, Errores } from '../components/UI/Formulario';
import firebase from '../firebase';

import useValidacion from '../hooks/useValidacion';
import validarCrearCuenta from '../validacion/validarCrearCuenta';

const STATE_INICIAL = {
  nombre: '',
  email: '',
  password: ''
}

const CrearCuenta = () => {
  
  const [ error, guardarError ] = useState('');

  const {valores, errores, handleChange, handleSubmit, handleBlur} = useValidacion(STATE_INICIAL, validarCrearCuenta, crearCuenta);

  const{nombre, email, password} = valores;

  async function crearCuenta(){
    try {
      await firebase.registar(nombre, email, password);
      Router.push('/');
    } catch (error) {
      console.error('Hubo un error al crear el usuario', error.message);
      guardarError(error.message);
    }
  }


  return (
    <div>
      <Layout>
        <Fragment>
          <h1
            css={css`
              text-align: center;
              margin-top: 5rem;
            `}
          >Crear Cuenta</h1>
          <Formulario
            onSubmit={handleSubmit}
            noValidate
          >
            <Campo>
              <label htmlFor="nombre">Nombre</label>
              <input
                type="text"
                id="nombre"
                placeholder="Tu nombre"
                name="nombre"
                value={nombre}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </Campo>

            {errores.nombre && <Errores>{errores.nombre}</Errores>}
  
            <Campo>
              <label htmlFor="email">Email</label>
              <input
                type="text"
                id="email"
                placeholder="Tu email"
                name="email"
                value={email}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </Campo>

            {errores.email && <Errores>{errores.email}</Errores>}
  
            <Campo>
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                placeholder="Tu password"
                name="password"
                value={password}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </Campo>

            {errores.password && <Errores>{errores.password}</Errores>}

            {error && <Errores>{error}</Errores>}
  
            <InputSubmit
              type="submit"
              value="Crear Cuenta"
            />
  
          </Formulario>
        </Fragment>
      </Layout>
        
    </div>
  )
}

export default CrearCuenta;