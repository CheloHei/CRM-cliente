import React, { Fragment, useState,useEffect } from 'react';
import Swal from "sweetalert2";
import{withRouter} from 'react-router-dom';
import clienteAxios from '../../config/axios';



const EditarCliente = (props) => {
    //obtener id
    const {id} = props.match.params;

    const [cliente, setCliente] = useState({
        nombre: '',
        apellido: '',
        empresa: '',
        email: '',
        telefono: ''
    });
    //query a la api
    const consultarAPI = async()=>{
        const clienteConsulta = await clienteAxios.get(`/clientes/${id}`);

        //colocar en state
        setCliente(clienteConsulta.data);
    }
    //useEffect 
    useEffect(()=>{
        consultarAPI();
    },[]);

    //leer datos del form
    const actualizarState = e => {
        //almacenar lo que el usuario escribe
        setCliente({
            ...cliente,
            [e.target.name]: e.target.value
        })
        //console.log(cliente);
    }

    //añade en la rest api un cliente nuevo
    const actualizarCliente = e => {
        e.preventDefault();
        //enviar peticion axios
        clienteAxios.put(`/clientes/${cliente._id}`, cliente)
            .then(res => {
                if (res.data.code === 11000) {
                    Swal.fire({
                            type: 'error',
                            title: 'Hubo un error',
                            text:'Ese cliente ya esta registrado'
                        })
                } else {

                    Swal.fire(
                        'Se actualizo el cliente',
                        res.data.mensaje,
                        'success'
                    )
                }
                //redireccionar
                props.history.push('/');
            });
    }

    //validar Form 
    const validarCLiente = () => {
        //destructuring
        const { nombre, apellido, email, empresa, telefono } = cliente;

        //revisar que las prop tengan contenido
        let valido = !nombre.length || !apellido.length || !email.length || !empresa.length || !telefono.length;
        return valido;
    }

    return (
        <Fragment>
            <main className="caja-contenido col-9">
                <h2>Editar Cliente</h2>

                <form
                    onSubmit={actualizarCliente}
                >
                    <legend>Llena todos los campos</legend>

                    <div className="campo">
                        <label>Nombre:</label>
                        <input

                            type="text"
                            placeholder="Nombre Cliente"
                            name="nombre"
                            onChange={actualizarState}
                            value={cliente.nombre}
                        />
                    </div>

                    <div className="campo">
                        <label>Apellido:</label>
                        <input
                            type="text"
                            placeholder="Apellido Cliente"
                            name="apellido"
                            onChange={actualizarState}
                            value={cliente.apellido}
                        />
                    </div>

                    <div className="campo">
                        <label>Empresa:</label>
                        <input
                            type="text"
                            placeholder="Empresa Cliente"
                            name="empresa"
                            onChange={actualizarState}
                            value={cliente.empresa}
                        />
                    </div>

                    <div className="campo">
                        <label>Email:</label>
                        <input
                            type="email"
                            placeholder="Email Cliente"
                            name="email"
                            onChange={actualizarState}
                            value={cliente.email}
                        />
                    </div>

                    <div className="campo">
                        <label>Teléfono:</label>
                        <input
                            type="text"
                            placeholder="Teléfono Cliente"
                            name="telefono"
                            onChange={actualizarState}
                            value={cliente.telefono}
                        />
                    </div>

                    <div className="enviar">
                        <input
                            type="submit"
                            className="btn btn-azul"
                            value="Guradar Cambios"
                            onChange={actualizarState}
                            disabled={validarCLiente()}
                        />
                    </div>

                </form>

            </main>
        </Fragment>
    );
};
//HOC es una funcion que toma un compon y retorna uno nuevo
export default withRouter(EditarCliente);