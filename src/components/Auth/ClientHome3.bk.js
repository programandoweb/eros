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
        <div className="container">
          <div className="row justify-content-center set_width_container">
            <div className="col-sm-6">
            <div className="row justify-content-center">
              <div className="row justify-content-center">
                <div className="col-6 col-sm-5 text-center">
                  <img className="img-fluid" src={logo} alt="ErosApp"/>
                </div>
              </div>
            </div>



              <div className="row justify-content-center mt-2 ">
                <div className="col-12 col-sm-8  background-text">
                  <div className="leter text-left  App-Question--x2  p-2  ">¿Qué quieres hacer conmigo?</div>
                  <div className="leter text-left  App-Question--x2  p-2  ">Pasar un rato</div>
                  <div className="leter text-left  App-Question--x2  p-2  ">Compañía</div>
                  <div className="leter text-left  App-Question--x2  p-2  ">Striptease</div>
                  <div className="leter text-left  App-Question--x2  p-2  ">¿Destape total?</div>
                  <div className="leter text-left  App-Question--x2  p-2  ">Amanecida</div>
                  <div className="leter text-left  App-Question--x2  p-2 mb-2  ">Desde y hasta</div>

                  <div className="leter text-left  App-Question--x2  p-2  ">Mi servicio de prepago incluye:</div>
                  <div className="leter text-left  text-gray  p-2  mb-5">Besos, Anal, Vaginal, Masaje, Ducha,
                  Facial. Orgía, Oral con condon, Strap-on. </div>

                  <div className="leter text-left  App-Question--x2  p-2 mb-5 ">Atiendo a:</div>

                  <div className="leter text-left  App-Question--x2  p-2 mb-5 ">Atiendo en:</div>

                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}

export default App;
