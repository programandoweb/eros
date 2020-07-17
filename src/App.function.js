import React, { useState , useEffect , useContext } from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import './App.css';
import StateContext from './helpers/contextState';
import {Home,Dialog,Login,Splash} from "./components/Index";

let defaultState  = {
                      loading: false,
                      splash: true,
                      loggedIn: false,
                      dialog:{
                                status:false,
                                title:"Título de la ventana",
                                message:"Prueba de mensaje",
                                callback:false
                      }
                    };

const App  = (props) =>{

  /*
    DATOS DEL USUARIO EN EL STATE,
    DESPUÉS LOS LLENO AL INICIAR LA APLICACIÓN
    PRIMERO CONSULTO EL LOCALSTORE SI ESTÁ VACÍO ENVÍO AL LOGIN
  */
  const [user, setUser]   = useState(false);

  /*
    STATE PARA COLOCARLO EN CONTEXT Y PODER CENTRALIZAR LOS CAMBIOS
    AL STATE EN EL APP PRINCIPAL
  */
  const [state, setState] = useState(defaultState);


  /*TIME PARA EL Splash Y QUE SE EJECUTE SÓLO UNA VEZ EN EL RENDERIZADO*/
  useEffect(() => {
      let setSplash         = state;
          setSplash.splash  = false;
     setTimeout(function(){ setState(setSplash); }, 3000);
  },[]);

  return <StateContext.Provider value={{setState:setState,state:state}}>
            <BrowserRouter>
              <Dialog methods={{setState:setState,state:state}}/>
              <Switch>
                <Route  path="/"render={  (props) => !user ? (state.splash)?<Splash {...props}/>:<Home {...props}/>:<Login/> }/>
              </Switch>
            </BrowserRouter>
          </StateContext.Provider>;
}

export default App;
