import React, { Fragment, useState } from 'react';
import Swal from 'sweetalert2';
import clienteAxios from '../../config/axios';
import { withRouter } from "react-router-dom";
const NuevoProducto = ({history}) => {

    const [producto, setProducto] = useState({
        nombre: '',
        precio: '',

    })

    const [archivo, setArchivo] = useState('');

    //almacena el neuvo producto
    const agregarProducto = async e =>{
        e.preventDefault();
        //crear un formdata
        const formData = new FormData();
        formData.append('descripcion',producto.nombre);
        formData.append('precio',producto.precio);
        formData.append('imagen',archivo);

        try {
            const res = await clienteAxios.post('/productos',formData,{
                headers:{
                    'Content-Type':'multipart/form-data'
                }
            })
            if(res.status===200){
                Swal.fire(
                    'Agregado correctamente',
                    res.data.mensaje,
                    'success'
                )
            }
            history.push('/productos');
        } catch (error) {
            Swal.fire({
                type:'error',
                title:'Hubor un error',
                text:'Hubo un error'
            })
        }
    }


    //leyendo datos del form
    const leerForm = (e) => {
        setProducto({
            ...producto,
            [e.target.name]: e.target.value
        });
    }

    const leerArchivo = e =>{
        setArchivo(e.target.files[0]);
    }

    return (
        <Fragment>

            <h2>Nuevo Producto</h2>

            <form
            onSubmit={agregarProducto}
            >
                <legend>Llena todos los campos</legend>

                <div className="campo">
                    <label>Nombre:</label>
                    <input
                        onChange={leerForm}
                        type="text" placeholder="Nombre Producto" name="nombre"
                    />

                </div>

                <div className="campo">
                    <label>Precio:</label>
                    <input
                        onChange={leerForm}

                        type="number" name="precio" min="0.00" step="0.01" placeholder="Precio"
                    />
                </div>

                <div className="campo">
                    <label>Imagen:</label>
                    <input
                    onChange={leerArchivo}
                        type="file" name="imagen"
                    />
                </div>

                <div className="enviar">
                    <input
                        type="submit" className="btn btn-azul" value="Agregar Producto"
                    />
                </div>
            </form>
        </Fragment>

    );
};

export default withRouter(NuevoProducto);