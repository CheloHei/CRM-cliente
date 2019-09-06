import React from 'react';

const FormCantidadProducto = (props) => {

    const {
        producto, restarProductos, sumarProductos,index,eliminarProductoPedido
    } = props

    return (
        <li>
            <div className="texto-producto">
                <p className="nombre">{producto.descripcion}</p>
                <p className="precio">${producto.precio}</p>
            </div>
            <div className="acciones">
                <div className="contenedor-cantidad">
                    <i
                        onClick={() => restarProductos(index)}
                        className="fas fa-minus"></i>
                    <p>{producto.cantidad}</p>
                    <i
                        onClick={() => sumarProductos(index)}
                        className="fas fa-plus"></i>
                </div>
                <button
                onClick={()=>eliminarProductoPedido(producto.producto)}
                type="button" className="btn btn-rojo">
                    <i className="fas fa-minus-circle"></i>
                    Eliminar Producto
                </button>
            </div>
        </li>
    );
};

export default FormCantidadProducto;