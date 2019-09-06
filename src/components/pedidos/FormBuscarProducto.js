import React from 'react';

const FormBuscarProducto = (props) => {
    return (
        <form
            onSubmit={props.buscarProducto}
        >
            <legend>Busca un Producto y agrega una cantidad</legend>
    
        <div className="campo">
            <label>Productos:</label>
            <input
            onChange={props.leerDatosBusqueda}
            type="text" placeholder="Nombre Productos" name="productos"/>
        </div>
        <input type="submit" className="btn btn-azul" value="buscar"/>

        </form>
    );
};

export default FormBuscarProducto;