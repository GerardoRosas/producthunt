import React, { Fragment, useState, useContext } from 'react';
import { css } from '@emotion/core';
import Layout from '../components/layout/Layout';
import Router, { useRouter } from 'next/router';
import { Formulario, Campo, InputSubmit, Errores } from '../components/UI/Formulario';
import { FirebaseContext } from '../firebase';
import FileUploader from 'react-firebase-file-uploader';

import useValidacion from '../hooks/useValidacion';
import validarCrearProducto from '../validacion/validarCrearProducto';

const STATE_INICIAL = {
  nombre: '',
  empresa: '',
  //imagen: '',
  url: '',
  descripcion: ''
}

const NuevoProducto = () => {

  //State de las imagnes
  const [ nombreimagen, guardarNombre ] = useState('');
  const [ subiendo, guardarSubiendo ] = useState(false);
  const [ progreso, guardarProgreso ] = useState(0);
  const [ urlImagen, guardarUrlImagen ] = useState('');
  
  const [ error, guardarError ] = useState('');

  const {valores, errores, handleChange, handleSubmit, handleBlur} = useValidacion
  (STATE_INICIAL, validarCrearProducto, crearProducto);

  const{ nombre, empresa, imagen, url, descripcion } = valores;

  //Hook de routing para redireccionar
  const router = useRouter();

  //Context con las operaciones crud de firebase
  const { usuario, firebase } = useContext(FirebaseContext);

  async function crearProducto(){
    //Si el usuario no esta auntenticado llevar al login
    if(!usuario) {
      return router.push('/login');
    } 

    //Crear el objeto de nuevo producto
    const producto = {
      nombre,
      empresa,
      url,
      urlImagen,
      descripcion,
      votos: 0,
      comentarios : [],
      creado: Date.now()
    }

    //Insertarlo en la base de datos
    firebase.db.collection('productos').add(producto);

    return router.push('/');

  }

  const handleUploadStart = () => {
    guardarProgreso(0);
    guardarSubiendo(true);
  }

  const handleProgress = progreso => guardarProgreso({ progreso });

  const handleUploadError = error => {
      guardarSubiendo(error);
      console.error(error);
  };

  const handleUploadSuccess = nombre => {
      guardarProgreso(100);
      guardarSubiendo(false);
      guardarNombre(nombre)
      firebase
          .storage
          .ref("productos")
          .child(nombre)
          .getDownloadURL()
          .then(url => {
            console.log(url);
            guardarUrlImagen(url);
          } );
  };

  return (
    <div>
      <Layout>
        <Fragment>
          <h1
            css={css`
              text-align: center;
              margin-top: 5rem;
            `}
          >Nuevo Producto</h1>
          <Formulario
            onSubmit={handleSubmit}
            noValidate
          >

            <fieldset>
              <legend>Información del Producto</legend>
            
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
                <label htmlFor="empresa">Empresa</label>
                <input
                  type="text"
                  id="empresa"
                  placeholder="Nombre Empresa o Companía"
                  name="empresa"
                  value={empresa}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </Campo>

              {errores.empresa && <Errores>{errores.empresa}</Errores>}

              <Campo>
                <label htmlFor="imagen">Imagen</label>
                <FileUploader
                  accept="image/*"
                  id="imagen"
                  name="imagen"
                  randomizeFilename
                  storageRef={firebase.storage.ref("productos")}
                  onUploadStart={handleUploadStart}
                  onUploadError={handleUploadError}
                  onUploadSuccess={handleUploadSuccess}
                  onProgress={handleProgress}
                />
              </Campo>

              <Campo>
                <label htmlFor="url">URL</label>
                <input
                  type="url"
                  id="url"
                  placeholder="URL de tu producto"
                  name="url"
                  value={url}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </Campo>

              {errores.url && <Errores>{errores.url}</Errores>}  

            </fieldset>

            <fieldset>
              <legend>Sobre tu producto</legend>

              
              <Campo>
                <label htmlFor="descripcion">Descripción</label>
                <textarea
                  
                  id="descripcion"
                  name="descripcion"
                  value={descripcion}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </Campo>

              {errores.descripcion && <Errores>{errores.descripcion}</Errores>}
            </fieldset>



            {error && <Errores>{error}</Errores>}
  
            <InputSubmit
              type="submit"
              value="Crear Producto"
            />
  
          </Formulario>
        </Fragment>
      </Layout>
        
    </div>
  )
}

export default NuevoProducto;