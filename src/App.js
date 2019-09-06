import React, { Fragment, useContext } from 'react';
import Header from './components/layout/Header';
import Navbar from './components/layout/Navbar';
/**
 * Componentes
 */
/*======================CLIENTES========================*/
import Clientes from './components/clientes/Clientes';
import NuevoCliente from './components/clientes/NuevoCliente';
import EditarCliente from './components/clientes/EditarCliente';
/*=========================================================*/
/*======================PRODUCTOS========================*/
import Productos from './components/productos/Productos';
import NuevoProducto from './components/productos/NuevoProducto';
import EditarProducto from './components/productos/EditarProducto';
/*=========================================================*/
/*======================PEDIDOS========================*/
import Pedidos from './components/pedidos/Pedidos';
import NuevoPedido from './components/pedidos/NuevoPedido';
/*=========================================================*/

import Login from './components/auth/Login';

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { CRMContext, CRMProvider } from './context/CRMContext';

function App() {

  //utilizar context en el componente
  const [auth, setAuth] = useContext(CRMContext);


  return (
    <Router>
      <Fragment>
        <CRMProvider value={[auth, setAuth]}>
          <Header />
          <div className="grid contenedor contenido-principal">
            <Navbar />

            <main className="caja-contenido col-9">
              <Switch>
                <Route exact path="/" component={Clientes} />
                <Route exact path="/clientes/nuevo" component={NuevoCliente} />
                <Route exact path="/clientes/editar/:id" component={EditarCliente} />

                <Route exact path="/productos" component={Productos} />
                <Route exact path="/productos/nuevo" component={NuevoProducto} />
                <Route exact path="/productos/editar/:id" component={EditarProducto} />

                <Route exact path="/pedidos" component={Pedidos} />
                <Route exact path="/pedidos/nuevo/:id" component={NuevoPedido} />
                <Route exact path="/iniciar-sesion" component={Login} />
              </Switch>
            </main>

          </div>
        </CRMProvider>
      </Fragment>
    </Router>
  );
}
export default App;
