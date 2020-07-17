import React,{useState,useEffect} from 'react';
import '../../App.css';
import background   from '../../assets/images/design/bg-cliente.jpeg';


import prepago  from '../../assets/images/resources/icono-prepago.png';
import escort  from '../../assets/images/resources/icono-escort.png';
import show_strip  from '../../assets/images/resources/icono-show-striptease.png';
import amanecida  from '../../assets/images/resources/icono-amanecida.png';
import videollamada  from '../../assets/images/resources/icono-videochat.png';

import Link from '@material-ui/core/Link';
import Config from "../../helpers/config";
import Autocomplete from "../Autocomplete";
import StateContext from '../../helpers/contextState'
import Functions from "../../helpers/functions";
import store from "../../helpers/store";
import PerfilHome from "../../screens/PerfilHome";
import ShowStriper from "../../screens/ShowStriper";

import Selector from "../Selector";



const divBackground = {
  backgroundImage: 'url(' + background + ')',
};



let user    = store.get("user");
let motel   = store.get("motel");

let url_continue = false;

const  inputsDefault  = {
                          eleccion:{
                            items:["Si","No"],
                            selection:"Si",
                          },

                        }


function App() {
  //const [inputs, setImputs] = useState(inputsDefault);

  const [inputs, setImputs] = useState({
                                          number_account_bank:"",
                                          number_nequi:"",
                                          number_identification:"",
                                          id_verification:0,


                                        });

  const context             =   React.useContext(StateContext);

  function callbackContinue(data){
    let modal = {
              status:true,
              title:"¡Registro con éxito!",
              message:"¡ya puedes usar tu cuenta!",
              ico:{
                    contentColor:"modal-ico-bg-green",
                    ico:'fas fa-check pl-1',
                  },
              customButtom:{
                link:Config.ConfigAppUrl+"Auth/Login",
              }
            }
    context.setState({dialog:modal})
    //document.location.href=url_continue;
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
    url_continue=e.target.href;
    let send  =   store.get("motel");
        send.user_id=store.get("user").user_id
    Functions.PostAsync("User","setMotel",send,context,{name:"callbackContinue",funct:callbackContinue})
  }

  useEffect(()=>{
    let __inputs    = inputs
    Object.entries(inputs).map((v,k)=>{
      if(motel[v[0]]!==undefined) {
        __inputs[v[0]]  = motel[v[0]];
      }
    })
    setImputs(__inputs)
  },[])

  return (
    <div className="App-LogoCenter App-splash" style={divBackground}>
      <form className="App-form App-form-register">

        <div className="container">
          <div className="row justify-content-center ">
              <div className="col-6 col-sm-2 text-left background-text3">
                <div className="text-gray ">
                  CLIENTE
                </div>
                <div className="App-Question--x2">
                  Lucho$
                </div>
              </div>

              <div className="col-6 col-sm-2 text-left background-text3">
                <div className="text-gray ">
                  estrellas
                </div>
              </div>
          </div>
        </div>


        <div className="row justify-content-center ">
          <div className="col-12 col-sm-3 text-left ">
            <div className="App-Question--x2 text-left mb-3 mt-4">Detalles del servicio</div>
          </div>
        </div>

        <div className="container">
          <div className="row justify-content-center">
              <div className="col-6 col-sm-2 text-left background-text">
                <div className="App-Question--x2">
                  Estado
                </div>
              </div>

              <div className="col-6 col-sm-2 text-left background-gray bordes1">
                <div className="text-gray">
                  Pagado
                </div>
              </div>
          </div>
        </div>


        <div className="container">
          <div className="row justify-content-center  ">
              <div className="col-6 col-sm-2 text-left background-text ">
                <div className="App-Question--x2">
                  Servicio
                </div>
              </div>

              <div className="col-6 col-sm-2 text-left background-gray bordes1">
                <div className="text-gray">
                  Escort
                </div>
              </div>
          </div>
        </div>


        <div className="container">
          <div className="row justify-content-center  ">
              <div className="col-6 col-sm-2 text-left background-text ">
                <div className="App-Question--x2">
                  Fecha
                </div>
              </div>

              <div className="col-6 col-sm-2 text-left background-gray bordes1">
                <div className="text-gray">
                  03/03/2020
                </div>
              </div>
          </div>
        </div>


        <div className="container">
          <div className="row justify-content-center  ">
              <div className="col-6 col-sm-2 text-left background-text ">
                <div className="App-Question--x2">
                  Hora
                </div>
              </div>

              <div className="col-6 col-sm-2 text-left background-gray bordes1">
                <div className="text-gray">
                  10:00pm - 11:00pm
                </div>
              </div>
          </div>
        </div>


        <div className="container">
          <div className="row justify-content-center  ">
              <div className="col-6 col-sm-2 text-left background-text ">
                <div className="App-Question--x2">
                  Lugar
                </div>
              </div>

              <div className="col-6 col-sm-2 text-left background-gray bordes1">
                <div className="text-gray">
                  Cra 40 # 10-10
                </div>
              </div>
          </div>
        </div>

        <div className="container">
          <div className="row justify-content-center  ">
              <div className="col-6 col-sm-2 text-left background-text ">
                <div className="App-Question--x2">
                  Pago
                </div>
              </div>

              <div className="col-6 col-sm-2 text-left background-gray bordes1">
                <div className="text-gray">
                  Servicio: $150
                  Domicilio: $30
                  Tiempo adicional: $50
                </div>
              </div>
          </div>
        </div>


        <div className="container">
          <div className="row justify-content-center  ">
              <div className="col-6 col-sm-2 text-left background-text ">
                <div className="App-Question--x2">
                  Total
                </div>
              </div>

              <div className="col-6 col-sm-2 text-left background-gray bordes1">
                <div className="text-gray">
                  $230
                </div>
              </div>
          </div>
        </div>



      </form>
    </div>
  );
}

export default App;
