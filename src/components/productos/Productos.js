import React, { Fragment, useState, useEffect } from 'react';
import clienteAxios from '../../config/axios';
import Producto from './Producto';
import Spinner from '../layout/Spinner';
import { Link } from "react-router-dom";

const Productos = () => {
    //llamando al state
    const [productos, setProducto] = useState([]);

    const consultarApi = async () => {
        const consulta = await clienteAxios.get('/productos')

        setProducto(consulta.data);
    }

    //en funcion useEffect hacer consulta
    useEffect(() => {
        consultarApi()
    }, [productos])
//spinner
if(!productos.length){
    return <Spinner/>
}

    return (
        <Fragment>
            <h2>Productos</h2>
            <Link to={"productos/nuevo"} className="btn btn-verde nvo-cliente"> <i className="fas fa-plus-circle"></i>
                Nuevo Producto
            </Link>
            {productos.map(producto => 
                    <Producto
                        key={producto._id}
                        producto={producto}
                          
                    />
            )}
        </Fragment>
    );
};

export default Productos;