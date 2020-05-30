import React, {Fragment} from 'react';
import Header from './Header'
import {Global, css } from '@emotion/core';
import Head from 'next/head';


const Layout = props => {
    return ( 
        <Fragment>
            {/*Se aplican a todos los estilos globales*/}
            <Global 
                styles={css`
                    :root{
                        --gris: #3d3d3d;
                        --gris2: #6F6F6F;
                        --gris3: #e1e1e1;   
                        --naranja: #DA552F;
                    }
                    html{
                        font-size: 62.5%;
                        box-sizing: border-box;
                    }
                    *, *:before, *:after {
                        box-sizing: inherint;
                    }
                    body{
                        font-size: 1.6rem;
                    }
                    h1,h2,h3{
                        margin: 0 0 2rem;
                        line-height: 1.5;
                    }
                    h1,h2{
                        font-family: 'Roboto Slab', serif;
                        font-weight: 700;
                    }
                    h3{
                        font-family: 'PT Sans', sans-serif;
                    }
                    ul{
                        list-style: none;
                        margin: 0;
                        padding: 0;
                    }
                    a{
                        text-decoration: none;
                    }
                    img{
                        max-width: 100%;
                    }
                `}
            />
            <Head>
                <html lang="es" />
                <title>ProductHunt Firebase y Next.js</title>
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.1/normalize.min.css" 
                    integrity="sha256-l85OmPOjvil/SOvVt3HnSSjzF1TUMyT9eV0c2BzEGzU=" crossorigin="anonymous" />
                <link href="https://fonts.googleapis.com/css2?family=PT+Sans:wght@400;700&family=Roboto+Slab:wght@400;700&display=swap" rel="stylesheet"/>
                <link href="/static/css/app.css" rel="stylesheet"/>
                
            </Head>

            <Header />

            <main>
                {props.children}
            </main>
        </Fragment>
    );
}
 
export default Layout;