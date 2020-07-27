import React,{useState,useEffect} from 'react';
import '../../App.css';
import background   from '../../assets/images/design/bg-cliente.jpeg';
import prepago  from '../../assets/images/resources/icono-prepago.png';
import escort  from '../../assets/images/resources/icono-escort.png';
import show_strip  from '../../assets/images/resources/icono-show-striptease.png';
import amanecida  from '../../assets/images/resources/icono-amanecida.png';
import videollamada  from '../../assets/images/resources/icono-videochat.png';
import Config from "../../helpers/config";

import StateContext from '../../helpers/contextState'
import Functions from "../../helpers/functions";
import store from "../../helpers/store";
import Services from "../../screens/ServicesEscort";
import ShowStriper from "../../screens/ShowStriper";

import Selector from "../Selector";



const divBackground = {
  backgroundImage: 'url(' + background + ')',
};



let user    = store.get("user");
let motel   = store.get("motel");

const  inputsDefault  = {
                          eleccion:{
                            items:["Si","No"],
                            selection:"Si",
                          },

                        }


function App() {
  const [inputs, setImputs] = useState({
                                          number_account_bank:"",
                                          number_nequi:"",
                                          number_identification:"",
                                          id_verification:0,


                                        });

  const context             =   React.useContext(StateContext);

  function callbackContinue(){
    document.location.href=Config.ConfigAppUrl+"Auth/HotelRegister15";
  }

  function KeyUp(e) {
    let name          =   e.target.name;
    let _inputs       =   inputs;
        _inputs[name] =   e.target.value;
        store.set("motel",_inputs)
        setImputs(_inputs)
  }

  function handleChange(e){
    store.set("motel",{...motel,[e.target.name]:e.target.value})
  }

  function handleClick(e){
    e.preventDefault();
    let _inputs       =   inputs
        _inputs.data  =   JSON.stringify(store.get("escort"))
        _inputs.token =   user.token
        inputs.user_id    =   store.get("user").user_id;
    Functions.PostAsync("User","setEscortRegisterServiciosPrecios",inputs,context,{name:"callbackContinue",funct:callbackContinue})
  }

  useEffect(()=>{
    let __inputs    = inputs
  },[])

  return (
    <div className="App-LogoCenter App-splash" style={divBackground}>
      <form className="App-form App-form-register">
        <div className="container">
          <div className="row justify-content-center mt-4">
            <div className="col-12 col-sm-4 text-center">
              <div className="App-Question text-center">¿Qué servicios ofrezco?</div>
            </div>
          </div>
          <div className="row justify-content-center">
            <div className="col-12 col-sm-4 mt-3">
              <Services
                store="escort"
                icon={prepago}
                label="Prepago"
                name="prepaid"
                placeholder="0.00"
                htmlLabel="30 Minutos"
                times={
                        [
                          {
                            title:"30 Minutos",
                            name:"prepaid_30_min",
                          }
                          ,
                          {
                            title:"1 Hora",
                            name:"prepaid_one_hour",
                          }
                        ]
                      }
              />
            </div>
          </div>
          <div className="row justify-content-center">
            <div className="col-12 col-sm-4 mt-3">
              <Services
                store="escort"
                question={[
                            {
                              title:"Está bien que me recojan.",
                              name:"question_donde_es_encuentro",
                            },
                            {
                              title:"En punto de encuentro.",
                              name:"question_donde_es_encuentro",
                            },
                            {
                              title:"Llego al lugar.",
                              name:"question_donde_es_encuentro",
                            },
                          ]}
                icon={escort}
                label="Escort"
                name="number_identification"
                placeholder="0.00"
                htmlLabel="30 Minutos"
              />
            </div>
          </div>

          <div className="row justify-content-center">
            <div className="col-12 col-sm-4 mt-3">
              <Services
                store="escort"
                icon={show_strip}
                label="Show Striptease"
                name="sowid"
                placeholder="0.00"
                htmlLabel="30 Minutos"
                times={
                        [
                          {
                            title:"30 Minutos",
                            name:"showid_30_min",
                          }
                          ,
                          {
                            title:"1 Hora",
                            name:"showid_one_hour",
                          }
                        ]
                      }
              />
            </div>
          </div>

          <div className="row justify-content-center">
            <div className="col-12 col-sm-4 mt-3">
              <Services
                store="escort"
                icon={amanecida}
                label="Amanecida"
                name="amanecidaid"
                placeholder="0.00"
                htmlLabel="30 Minutos"
                times={
                        [
                          {
                            title:"Precio por noche",
                            name:"amanecidaid_noche",
                          }
                          ,
                          {
                            title:"Desde",
                            name:"amanecidaid_desde",
                          }
                          ,
                          {
                            title:"Hasta",
                            name:"amanecidaid_hasta",
                          }
                        ]
                      }
              />
            </div>
          </div>
          <div className="row justify-content-center">
            <div className="col-12 col-sm-4 mt-3">
              <Services
                store="escort"
                icon={videollamada}
                label="Videollamada"
                name="videollamadaid"
                placeholder="0.00"
                htmlLabel="30 Minutos"
                times={
                        [
                          {
                            title:"Precio por minuto",
                            name:"videollamadaid_minuto_publico",
                          }
                          ,
                          {
                            title:"Precio por minuto",
                            name:"videollamadaid_minuto_privado",
                          }
                        ]
                      }
              />
            </div>
          </div>
          <div className="row justify-content-md-center mt-3">
            <div className="col-12 col-sm-4 text-centerr">
              <div onClick={handleClick} className="btn btn-primary btn-block btn-lg text-white text-decoration-none" href={Config.ConfigAppUrl+"Auth/HotelRegister15"} >
                Continuar
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default App;
