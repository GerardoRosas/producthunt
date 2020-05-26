import React from 'react';
import Buscar from '../UI/Buscar';
import Navegacion from './Navegacion';
import Linbkf from 'next/link';
import styled from '@emotion/styled';
import Link from 'next/link';



const Header = () => {
    return ( 
        <header>
            <div>
                <div>
                    <p>P</p>
                    
                    {/*Buscador Aqui*/}
                    <Buscar />

                    {/*Nav Aqui*/}
                    <Navegacion />

                </div>
                <div>
                    {/*Menu de administracion*/}
                    <p>Hola: Gerardo</p>
                    <button type="button">Cerrar Sesión</button>
                    <Link href="/">Login</Link>
                    <Link href="/">Crear Cuenta</Link>


                </div>
            </div>
        </header>
     );
}
 
export default Header;