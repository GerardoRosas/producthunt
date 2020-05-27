import React, { Fragment, useState } from 'react';
import { css } from '@emotion/core';
import Layout from '../components/layout/Layout';
import Router from 'next/router';
import { Formulario, Campo, InputSubmit, Errores } from '../components/UI/Formulario';
import firebase from '../firebase';

import useValidacion from '../hooks/useValidacion';
import validarIniciarSesion from '../validacion/validarIniciarSesion';

const STATE_INICIAL = {
  email: '',
  password: ''
}


const Login = () => {
  
  const [ error, guardarError ] = useState('');

  const {valores, errores, handleChange, handleSubmit, handleBlur} = useValidacion(STATE_INICIAL, validarIniciarSesion, iniciarSesion);

  const{ email, password } = valores;

  async function iniciarSesion() {
    try {
      await firebase.login(email, password);
      Router.push('/');
    } catch (error) {
      console.error('Hubo un error al autenticar el usuario', error.message);
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
          >Iniciar Sesión</h1>
          <Formulario
            onSubmit={handleSubmit}
            noValidate
          >
  
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
              value="Iniciar Sesión"
            />
  
          </Formulario>
        </Fragment>
      </Layout>
        
    </div>
  )
}

export default Login;