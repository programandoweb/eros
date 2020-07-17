import React, {useState} from 'react';
import '../../App.css';
import logo from '../../assets/images/design/logo.png';
import background from '../../assets/images/design/bg-escort.jpeg';
import Link from '@material-ui/core/Link';
import Config from "../../helpers/config";
import ContentBoxHomeEscort from "../../screens/ContentBoxHomeEscort";
import StateContext from '../../helpers/contextState'
import Functions from "../../helpers/functions";
import store from "../../helpers/store";
import Autocomplete from "../AutocompleteCountry";

import ficha  from '../../assets/images/resources/eroscoin.png';


const divBackground = {
  backgroundImage: 'url(' + background + ')',
};

let url_continue = false;

function App() {
  const [gender, setGender]   =   useState(false)
  const [inputs, setInputs]   =   useState({
                                              nationality:"",
                                              gender:"",
                                            });

  const context               =   React.useContext(StateContext);

  function handleClick(e){
    console.log();
    if (store.get("escort").nationality!==undefined && store.get("escort").nationality!=='' && inputs.gender!=='') {

      /*PUSH DATA STORE*/
      let Motel           =   store.get("motel");
      Object.entries(inputs).map((v,k)=>{
        if (Motel[v[0]]===undefined ) {
          Motel[v[0]]   =   "";
        }
        Motel[v[0]]     =   v[1] ;
      })
      store.set("motel",Motel);
      /*END PUSH DATA STORE*/

      url_continue    =   e.target.href;
      inputs.user_id  =   store.get("user").user_id;
      Functions.PostAsync("User","setEscort",inputs,context,{name:"callbackContinue",funct:callbackContinue})
      e.preventDefault();
    }else {
      let modal = {
                status:true,
                title:"Campos incompletos",
                message:"Para completar el proceso de registro debes sumistrar la nationality y el género",
                ico:{
                      contentColor:"modal-ico-bg-primary",
                      ico:'fas fa-exclamation pl-3',
                    },
              }
      context.setState({dialog:modal})
      e.preventDefault();
    }
  }

  function callbackContinue(){
    document.location.href  = url_continue;
  }

  function _setGender(gender){
    let _inputs         = inputs;
        _inputs.gender  = gender;
    setGender(gender);
    setInputs(_inputs)
  }

  function KeyUp(e) {
    let name          =   e.target.name;
    let _inputs       =   inputs;
        _inputs[name] =   e.target.value;
        setInputs(_inputs)
  }

  return (
    <div className="App-LogoCenter App-splash" style={divBackground}>
      <form className="App-form App-form-register">

        <div className="container ">
          <div className="row justify-content-center ">
              <div className="col-12 col-sm-4 text-left background-gray2  pb-3 mt-4">
                <div className="leter text-center App-Question--x2 ">
                  ¿Qué quieres hacer conmigo?
                </div>
              </div>
          </div>
        </div>

        <div className="container">
          <div className="row justify-content-center">
              <div className="col-6 col-sm-2 text-left background-gray2 pb-3">
                <div className="App-Question--x2 text-fucsia2 text-left ">
                  Pasar un rato
                </div>
              </div>

              <div className="col-6 col-sm-2 text-left background-gray2 pb-3">
                <div className="text-gray text-right">
                  $150.000 / 1h
                </div>
              </div>
          </div>
        </div>


        <div className="container">
          <div className="row justify-content-center">
              <div className="col-6 col-sm-2 text-left background-gray2 pb-3">
                <div className="App-Question--x2 text-fucsia2 text-left ">
                  Compañia
                </div>
              </div>

              <div className="col-6 col-sm-2 text-left background-gray2 pb-3">
                <div className="text-gray text-right">
                  $150.000 / 1h
                </div>
              </div>
          </div>
        </div>


        <div className="container">
          <div className="row justify-content-center">
              <div className="col-6 col-sm-2 text-left background-gray2 pb-3">
                <div className="App-Question--x2 text-left ">
                  Striptease
                </div>
              </div>

              <div className="col-6 col-sm-2 text-left background-gray2 pb-3">
                <div className="text-gray text-right">
                  $60.000 / 20m
                </div>
              </div>
          </div>
        </div>


        <div className="container">
          <div className="row justify-content-center">
              <div className="col-6 col-sm-2 text-left background-gray2 pb-3">
                <div className="App-Question--x2 text-left ">
                  ¿Destape total?
                </div>
              </div>

              <div className="col-6 col-sm-2 text-left background-gray2 pb-3">
                <div className="text-gray text-right">
                  Si
                </div>
              </div>
          </div>
        </div>


        <div className="container">
          <div className="row justify-content-center">
              <div className="col-6 col-sm-2 text-left background-gray2 pb-3">
                <div className="App-Question--x2 text-left ">
                  Amanecida
                </div>
              </div>

              <div className="col-6 col-sm-2 text-left background-gray2 pb-3">
                <div className="text-gray text-right">
                  $160.000
                </div>
              </div>
          </div>
        </div>


        <div className="container">
          <div className="row justify-content-center">
              <div className="col-6 col-sm-2 text-left background-gray2 pb-3">
                <div className="App-Question--x2 text-left ">
                  Desde y Hasta
                </div>
              </div>

              <div className="col-6 col-sm-2 text-left background-gray2 pb-3">
                <div className="text-gray text-right">
                  10:00 pm - 6:00 am
                </div>
              </div>
          </div>
        </div>


        <div className="container">
          <div className="row justify-content-center">
              <div className="col-6 col-sm-2 text-left background-gray2 pb-3">
                <div className="App-Question--x2 text-left ">
                  Video llamada
                </div>
              </div>

              <div className="col-6 col-sm-2 text-left background-gray2 pb-3">
                <div className="text-gray text-right">
                  $5.000 / min
                </div>
              </div>
          </div>
        </div>


        <div className="container">
          <div className="row justify-content-center">
              <div className="col-12 col-sm-4 text-left background-gray2 pt-3">
                <div className="App-Question--x2 text-left ">
                  Mi servicio de prepago incluye:
                </div>
              </div>
          </div>
        </div>

        <div className="container">
          <div className="row justify-content-center ">
              <div className="col-12 col-sm-4 text-left background-gray2 pb-3">
                <div className="text-gray text-left ">
                Besos, Anal, Vaginal, Masaje, Ducha,
                Facial. Orgía, Oral con condon, Strap-on.
                </div>
              </div>
          </div>
        </div>


        <div className="container">
          <div className="row justify-content-center">
              <div className="col-6 col-sm-2 text-left background-gray2 pb-3 pt-4 ">
                <div className="App-Question--x2 text-left ">
                  Atiendo a:
                </div>
              </div>

              <div className="col-6 col-sm-2 text-left background-gray2 pb-3">
                <div className="text-gray text-right">
                <i class="fas fa-female icono-white mr-2"></i>
                  Mujeres
                </div>
                <div className="text-gray text-right">
                  <i class="fas fa-male icono-white mr-2"></i>
                  Hombres
                </div>
                <div className="text-gray text-right">
                  Parejas
                </div>
              </div>
          </div>
        </div>


        <div className="container">
          <div className="row justify-content-center">
              <div className="col-6 col-sm-2 text-left background-gray2 pb-3 pt-4 mb-4">
                <div className="App-Question--x2 text-left ">
                  Atiendo en:
                </div>
              </div>

              <div className="col-6 col-sm-2 text-left background-gray2 pb-3 mb-4">
                <div className="text-gray text-right">
                  Mi domicilio
                </div>
                <div className="text-gray text-right">
                  A domicilio
                </div>
                <div className="text-gray text-right">
                  Hotel/Motel
                </div>
              </div>
          </div>
        </div>

      </form>
    </div>
  )
}

export default App;
