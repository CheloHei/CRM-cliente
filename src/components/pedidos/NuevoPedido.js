import React, { useState, useEffect, Fragment } from 'react';
import clienteAxios from '../../config/axios';
import Swal from 'sweetalert2';
import FormBuscarProducto from "./FormBuscarProducto";
import FormCantidadProducto from './FormCantidadProducto';
import { withRouter } from 'react-router-dom';

const NuevoPedido = (props) => {

    const { id } = props.match.params;

    const [cliente, setCliente] = useState({});
    const [busqueda, setBusqueda] = useState('');
    const [productos, setProductos] = useState([]);
    const [total, setTotal] = useState(0);

    useEffect(() => {
        //obtener el cliente
        const consulta = async () => {
            const resultado = await clienteAxios.get(`/clientes/${id}`);
            setCliente(resultado.data);
        }
        consulta();

        actualizarTotal();
    }, [productos])

    const buscarProducto = async (e) => {
        e.preventDefault();
        const resultadoBusqueda = await clienteAxios.post(`/productos/busqueda/${busqueda}`);

        if (resultadoBusqueda.data[0]) {
            let productoResultado = resultadoBusqueda.data[0];

            productoResultado.producto = resultadoBusqueda.data[0]._id;
            productoResultado.cantidad = 0;

            setProductos([...productos, productoResultado])

        } else {
            //no hay nada
            Swal.fire({
                type: 'error',
                title: 'No hay resulados',
                text: 'Busca otro valor'
            })
        }
    }
    //almacena la busqueda en state
    const leerDatosBusqueda = (e) => {
        setBusqueda(e.target.value);

    }

    //actualizar cantidad de productos
    const restarProductos = (i) => {

        const todosProductos = [...productos]
        if (todosProductos[i].cantidad === 0) {
            return;
        }
        todosProductos[i].cantidad--;
        setProductos(todosProductos);
    }
    const sumarProductos = (i) => {
        const todosProductos = [...productos]
        todosProductos[i].cantidad++;
        setProductos(todosProductos);
    }

    //elimina el producto del state
    const eliminarProductoPedido = id => {
        const todosProductos = productos.filter(producto => producto.producto !== id);
        setProductos(todosProductos);
    }

    //actualizar total a apgar
    const actualizarTotal = () => {
        //si el arreglo es cero el total es cero
        if (productos.length === 0) {
            setTotal(0);
            return;
        }
        //calucular neuvo total
        let nuevoTotal = 0;
        //recorrer todos los productos
        productos.map(producto => nuevoTotal += (producto.cantidad * producto.precio));

        setTotal(nuevoTotal);
    }

    const realizarPedido = async e => {
        e.preventDefault();
        //construir el objeto
        const pedido = {
            "cliente": id,
            "pedido": productos,
            "total": total
        }
        console.log(pedido);
        //almacenar bd
        const resultado = await clienteAxios.post(`/pedidos/nuevo/${id}`, pedido);

        if (resultado.status === 200) {
            Swal.fire({
                type: 'success',
                title: 'Correcto',
                text: resultado.data.mensaje
            })
        } else {
            Swal.fire({
                type: 'error',
                title: 'Hubo un error vuelve a intentarlo',
                text: 'Vuelva a intentarlo'
            })
        }
        //redireccionar
        props.history.push('/');
    }

    return (
        <Fragment>
            <h2>Nuevo Pedido</h2>

            <div className="ficha-cliente">
                <h3>Datos de Cliente</h3>
                <p>{cliente.nombre} {cliente.apellido}</p>
            </div>


            <FormBuscarProducto
                buscarProducto={buscarProducto}
                leerDatosBusqueda={leerDatosBusqueda}
            />

            <ul className="resumen">
                {productos.map((producto, index) => (

                    <FormCantidadProducto
                        key={producto.producto}
                        producto={producto}
                        restarProductos={restarProductos}
                        sumarProductos={sumarProductos}
                        index={index}
                        eliminarProductoPedido={eliminarProductoPedido}
                    />
                ))}


            </ul>
            <p className="total">
                Total a Pagar: <span>$ {total}</span>
            </p>
            {total > 0 ? (
                <form
                    onSubmit={realizarPedido}
                >
                    <input type="submit" className="btn btn-verde btn-block" value="Realizar Pedido" />
                </form>
            ) :
                null
            }

        </Fragment>
    );
};

export default withRouter(NuevoPedido);