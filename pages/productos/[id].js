import React, { useEffect, useContext, useState } from 'react';
import {useRouter} from 'next/router';
import Layout from '../../components/layout/Layout';
import styled from '@emotion/styled';
import { css } from '@emotion/core';
import { es } from 'date-fns/locale';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import { Campo, InputSubmit } from '../../components/UI/Formulario';
import Boton from '../../components/UI/Boton';

import { FirebaseContext } from '../../firebase';
import Error404 from '../../components/layout/404';

const ContenedorProducto = styled.div`
    @media(min-width: 768px){
        display: grid;
        grid-template-columns: 2fr 1fr;
        column-gap: 2rem;
    }
`;

const CreadorProducto = styled.p`
    padding: .5rem 2rem;
    background-color: #DA552F;
    color: #fff;
    text-transform: uppercase;
    font-weight: bold;
    text-align: center;
    display: inline-block;
`;

const Producto = () => {

    const [producto, guardarProducto ] = useState({});
    const [ error, guardarError ] =  useState(false);
    const [ nuevoComentario, guardarNuevoComentario ] = useState({});

    //Routing para obtener el id actual
    const router = useRouter();
    const { query: {id}} = router;

    const { firebase, usuario } = useContext(FirebaseContext);

    useEffect(() => {
        if(id){
            const obtenerProducto = async () => {
                const productoQuery = await firebase.db.collection('productos').doc(id);
                const producto = await productoQuery.get();
                if(producto.exists){
                    guardarProducto(producto.data());
                }else{
                    guardarError(true);
                }
            }
            obtenerProducto();
        }
    }, [id, producto]);

    const {comentarios, empresa, descripcion, votos, nombre, url, urlImagen, creado, 
        creador, haVotado } = producto;

    //Administrar y validar los votos
    const votarProducto = () => {
        if(!usuario){
            return router.push('/login')
        }

        //Obtener y sumar un nuevo voto
        const nuevoTotal = votos + 1;

        //Verificar si el usuario actual ha votado
        if(haVotado.includes(usuario.uid)) return;

        //Guardar el id del usuario que ha votado
        const hanVotado = [...haVotado, usuario.uid];
        

        //Actualizar en la base de datos
        firebase.db.collection('productos').doc(id).update({ 
            votos: nuevoTotal, 
            haVotado: hanVotado 
        });

        //Actualizar el state
        guardarProducto({
            ...producto,
            votos: nuevoTotal
        })
    }

    //Funciones para crear comentarios
    const comentarioChange = e => {
        guardarNuevoComentario({
            ...nuevoComentario,
            [e.target.name] : e.target.value
        })
    }

    //Identifica si el comentario es del creador del producto
    const esCreador = id => {
        if(creador.id === id) {
            return true;
        }
    }

    const agregarComentario = e => {
        e.preventDefault();
        if(!usuario){
            return router.push('/login')
        }

        //informacion extra al comentario
        nuevoComentario.usuarioId = usuario.uid;
        nuevoComentario.usuarioNombre = usuario.displayName;

        //Tomar copia de comentarios y agregar al arreglo
        const nuevosComentarios = [...comentarios, nuevoComentario];

        //Actualizar la base de datos
        firebase.db.collection('productos').doc(id).update({
            comentarios: nuevosComentarios
        })

        //Actuaizar el state
        guardarProducto({
            ...producto,
            comentarios: nuevosComentarios
        })

    }
    

    return ( 
        <Layout>
            <>
                {error && <Error404 />}

                <div className="contenedor">
                    <h1 css={css`
                        text-align: center;
                        margin-top: 5rem;
                    `}
                    >{nombre}</h1>

                    <ContenedorProducto>
                        <div>
                            {/* <p>Publicado hace: {formatDistanceToNow( new Date(creado), {locale: es})}</p> */}

                            <img src={urlImagen} />
                            <p>Por: {creador.nombre} </p>
                            <p>{descripcion}</p>

                            {usuario && (
                                <>
                                    <h2>Agrega tu comentario</h2>
                                    <form
                                        onSubmit={agregarComentario}
                                    >
                                        <Campo>
                                            <input
                                                type="text"
                                                name="mensaje"
                                                onChange={comentarioChange}
                                            />
                                        </Campo>
                                        <InputSubmit
                                            type="submit"
                                            value="Agregar Comentario"
                                        />
                                    </form>
                                </>
                            )}

                            <h2                                                 
                                css={css`
                                    margin: 2rem 0;
                                `}
                            >Comentarios</h2>

                            {comentarios.length === 0 ? "Aun no hay comentarios" : (
                                <ul>
                                    {comentarios.map(comentario => (
                                        <li
                                            css={css`
                                                border: 1px solid #e1e1e1;
                                                padding: 2rem;
                                            `}
                                        >
                                            <p>{comentario.mensaje}</p>
                                            <p>Escrito por: 
                                                <span
                                                    css={css`
                                                        font-weight: bold;
                                                    `}
                                                >
                                                   {''} {comentario.usuarioNombre}
                                                </span>
                                            </p>
                                            {esCreador(nuevoComentario.usuarioId) && 
                                                <CreadorProducto>
                                                    Es Creador
                                                </CreadorProducto>
                                            }
                                        </li>
                                    ))}
                                </ul>
                            )}
                            
                        </div>
                        <aside>
                            <Boton
                                target="_blank"
                                bgColor="true"
                                href={url}
                            >Visitar URL</Boton>

                            
                            <div
                                css={css`
                                    margin-top: 5rem;
                                `}
                            >
                                <p css={css`
                                    text-align: center;
                                `}>{votos} Votos</p>

                                {usuario && (
                                    <Boton
                                        onClick={votarProducto}
                                    >Votar</Boton>
                                )}
                            </div>
                        </aside>
                    </ContenedorProducto>
                </div>
            </>

        </Layout>
    );
}
 
export default Producto;