import React, { useState, useContext } from 'react';
import { withRouter } from 'react-router-dom';
import Swal from 'sweetalert2';
import clienteAxios from '../../config/axios';
import { CRMContext } from '../../context/CRMContext';

const Login = (props) => {

    const [auth, setToken] = useContext(CRMContext);
    const [credenciales, setCredenciales] = useState({});

    const iniciarSesion = async (e) => {
        e.preventDefault();
        try {
            const res = await clienteAxios.post(`/iniciar-sesion`, credenciales);
            //extraer token
            const { token } = res.data;
            localStorage.setItem('token', token);

            setToken({
                token,
                auth: true
            })

            Swal.fire({
                title: 'Login Correcto',
                type: 'success'
            })
            props.history.push('/');
        } catch (error) {

            if (error.response) {

                Swal.fire({
                    type: 'error',
                    title: 'Hubo un error',
                    text: error.response.data.mensaje
                })
            } else {
                Swal.fire({
                    type: 'error',
                    title: 'Error',
                    text: 'Hubo un problema'
                })

            }

        }
    }

    const leerDatos = (e) => {
        setCredenciales({
            ...credenciales,
            [e.target.name]: e.target.value
        })
    }

    return (
        <div className="login">
            <h2>Iniciar Sesion</h2>
            <div className="contenedor-formulario">
                <form
                    onSubmit={iniciarSesion}
                >

                    <div className="campo">
                        <label htmlFor="email">Email</label>
                        <input type="text" name="email"
                            placeholder="Ingresa tu email"
                            required
                            onChange={leerDatos}
                        />
                    </div>
                    <div className="campo">
                        <label htmlFor="password">Password</label>
                        <input type="password" name="password"
                            placeholder="Ingresa tu password"
                            required
                            onChange={leerDatos}
                        />
                    </div>

                    <input type="submit" value="Iniciar Sesion" className="btn btn-verde btn-block" />


                </form>

            </div>

        </div>
    );
};

export default withRouter(Login);