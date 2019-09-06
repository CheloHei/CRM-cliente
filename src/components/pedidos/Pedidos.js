import React, { useEffect, useState, Fragment } from 'react';
import clienteAxios from "../../config/axios";
import Pedido from './Pedido';
import Spinner from '../layout/Spinner';

const Pedidos = () => {

    const [pedidos, setPedidos] = useState([]);

    useEffect(() => {
        const consulta = async () => {
            const resultado = await clienteAxios.get(`/pedidos`);
            setPedidos(resultado.data)
          
        }
        consulta();
    }, []);
    if(!pedidos.length) return <Spinner/>
    return (
        <Fragment>
            <h2>Pedidos</h2>


            <ul className="listado-pedidos">
                {pedidos.map(pedido => (
                    
                    <Pedido
                    key={pedido._id}
                    pedido={pedido}
                    />
                ))}

            </ul>
        </Fragment>
    );
};

export default Pedidos;