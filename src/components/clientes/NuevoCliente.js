import React, { Fragment, useState,useContext } from 'react';
import Swal from "sweetalert2";
import{withRouter} from 'react-router-dom';
import clienteAxios from '../../config/axios';
import { CRMContext } from '../../context/CRMContext';



const NuevoCliente = ({history}) => {

    const [auth, setAuth] = useContext(CRMContext);
console.log(auth);

    const [cliente, setCliente] = useState({
        nombre: '',
        apellido: '',
        empresa: '',
        email: '',
        telefono: ''
    });

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
    const agregarCliente = e => {
        e.preventDefault();
        //enviar peticion axios
        clienteAxios.post('/clientes', cliente)
            .then(res => {
                if (res.data.code === 11000) {
                    Swal.fire({
                            type: 'error',
                            title: 'Hubo un error',
                            text:'Ese cliente ya esta registrado'
                        })
                } else {

                    Swal.fire(
                        'Se agrego el cliente',
                        res.data.mensaje,
                        'success'
                    )
                }
                //redireccionar
                history.push('/');
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



let local = localStorage.getItem('token');

console.log(auth.auth);
console.log(auth.token);
console.log(local);

if(!auth.auth && (local === auth.token)){
    history.push('/iniciar-sesion');
}    

/* if(!auth.auth && (localStorage.getItem('token') === auth.token)){
        history.push('/iniciar-sesion');
    } */

    return (
        <Fragment>
            <main className="caja-contenido col-9">
                <h2>Nuevo Cliente</h2>

                <form
                    onSubmit={agregarCliente}
                >
                    <legend>Llena todos los campos</legend>

                    <div className="campo">
                        <label>Nombre:</label>
                        <input

                            type="text"
                            placeholder="Nombre Cliente"
                            name="nombre"
                            onChange={actualizarState}
                        />
                    </div>

                    <div className="campo">
                        <label>Apellido:</label>
                        <input
                            type="text"
                            placeholder="Apellido Cliente"
                            name="apellido"
                            onChange={actualizarState}
                        />
                    </div>

                    <div className="campo">
                        <label>Empresa:</label>
                        <input
                            type="text"
                            placeholder="Empresa Cliente"
                            name="empresa"
                            onChange={actualizarState}
                        />
                    </div>

                    <div className="campo">
                        <label>Email:</label>
                        <input
                            type="email"
                            placeholder="Email Cliente"
                            name="email"
                            onChange={actualizarState}
                        />
                    </div>

                    <div className="campo">
                        <label>Teléfono:</label>
                        <input
                            type="text"
                            placeholder="Teléfono Cliente"
                            name="telefono"
                            onChange={actualizarState}
                        />
                    </div>

                    <div className="enviar">
                        <input
                            type="submit"
                            className="btn btn-azul"
                            value="Agregar Cliente"
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
export default withRouter(NuevoCliente);