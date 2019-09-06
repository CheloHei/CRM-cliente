import React from 'react';
import { Link } from "react-router-dom";
import clienteAxios from '../../config/axios';
import Swal from 'sweetalert2';

const Producto = ({ producto }) => {

    const eliminarProducto = id => {
        Swal.fire({
            title: 'Estas seguro?',
            text: "Un producto eliminado no se puede recuperar!",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Borrar!',
            cancelButtonText: 'No',
        }).then((result) => {
            if (result.value) {
                clienteAxios.delete(`/productos/${id}`)
                    .then(res => {

                        Swal.fire(
                            'Eliminado!',
                            res.data,
                            'success'
                        )
                    });
                //llamar a la BD
                //consultarApi();

            }
        })
    }

    const { _id, descripcion, precio, imagen } = producto;

    return (
        <ul className="listado-productos">
            <li className="producto">
                <div className="info-producto">
                    <p className="nombre">{descripcion}</p>
                    <p className="precio">$ {precio}</p>
                    {
                        imagen ? (

                            <img src={`${process.env.REACT_APP_BACKEND_URL}/${imagen}`} />
                        ) : null
                    }
                </div>
                <div className="acciones">
                    <Link to={`/productos/editar/${_id}`} className="btn btn-azul">
                        <i className="fas fa-pen-alt"></i>
                        Editar Producto
                        </Link>

                    <button
                        onClick={() => eliminarProducto(_id)}
                        type="button" className="btn btn-rojo btn-eliminar">
                        <i className="fas fa-times"></i>
                        Eliminar Cliente
                        </button>
                </div>
            </li>
        </ul>
    );
};

export default Producto;