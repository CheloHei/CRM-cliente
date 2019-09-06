import React, { useEffect, useState, Fragment, useContext } from 'react';
import { Link, withRouter } from "react-router-dom";
import clienteAxios from '../../config/axios';
import Cliente from "./Cliente";
import Spinner from '../layout/Spinner';
import { CRMContext } from '../../context/CRMContext';


const Clientes = (props) => {

    //trabajar con state
    //clientes = state 
    //setClientes = guarda el state
    const [clientes, setClientes] = useState([]);

    //utilizar valores del context
    const [auth, setAuth] = useContext(CRMContext);
   
    useEffect(() => {
        if (auth.token !== '') {
            //consulta Api
            const consultarApi = async () => {
                try {
                    const clientesConsulta = await clienteAxios.get('/clientes', {
                        headers: {
                            Authorization: `Bearer ${auth.token}`
                        }
                    });
                    setClientes(clientesConsulta.data);

                } catch (error) {
                    if (error.response.status = 500) {
                        props.history.push('/iniciar-sesion')
                    }
                }
            }
            consultarApi();
        } else {
            props.history.push('/iniciar-sesion');
        }

        //useEffect similar a componoenteDidMount
    }, [clientes]);

    //si state es false
    if (!auth.auth) {
        props.history.push('/iniciar-sesion');
    }

    if (!clientes.length) return <Spinner />
    return (
        <Fragment>
            <h2>Clientes</h2>

            <Link to={"/clientes/nuevo"} className="btn btn-verde nvo-cliente"> <i className="fas fa-plus-circle"></i>
                Nuevo Cliente
            </Link>


            <ul className="listado-clientes">
                {clientes.map(cliente => (
                    <Cliente
                        key={cliente._id}
                        cliente={cliente}

                    />
                ))}
            </ul>
        </Fragment>

    );
};

export default withRouter(Clientes);