import React from 'react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import clienteAxios from '../../config/axios';

const Cliente = ({ cliente}) => {

    //eliminar cliente
    const eliminarCliente = idCliente  =>{
        Swal.fire({
            title: 'Estas seguro?',
            text: "Un cliente eliminado no se puede recuperar!",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Borrar!',
            cancelButtonText: 'No',
          }).then((result) => {
            if (result.value) {
                clienteAxios.delete(`/clientes/${idCliente}`)
                .then(res=>{

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

    const { _id, nombre, apellido, empresa, email, telefono } = cliente;
    return (
        <li className="cliente">
            <div className="info-cliente">
                <p className="nombre">{nombre} {apellido}</p>
                <p className="empresa">{empresa}</p>
                <p>{email}</p>
                <p>Tel: {telefono}</p>
            </div>
            <div className="acciones">
                <Link to={`/clientes/editar/${_id}`} className="btn btn-azul">
                    <i className="fas fa-pen-alt"></i>Editar Cliente
                </Link>
                <Link to={`/pedidos/nuevo/${_id}`} className="btn btn-amarillo">
                    <i className="fas fa-plus"></i>Nuevo Pedido
                </Link>

                <button
                
                type="button"
                className="btn btn-rojo btn-eliminar"
                onClick={()=>eliminarCliente(_id)}
                >
                    <i className="fas fa-times"></i>
                    Eliminar Cliente
                        </button>
            </div>
        </li>
    );
};

export default Cliente;