import React, {useState} from 'react';
import '../../App.css';
import logo from '../../assets/images/resources/erosapp-user-check.png';
import background from '../../assets/images/design/bg-escort.jpeg';
import Link from '@material-ui/core/Link';
import Config from "../../helpers/config";
import ContentBox from "../../screens/ContentBoxDondeAtendere";
import StateContext from '../../helpers/contextState'
import Functions from "../../helpers/functions";
import store from "../../helpers/store";
import Autocomplete from "../AutocompleteCountry";

const divBackground = {
  backgroundImage: 'url(' + background + ')',
};

let user    = store.get("user");
let url_continue = false;

function App() {
  const [gender, setGender]   =   useState(false)
  const [inputs, setInputs]   =   useState({});

  const context               =   React.useContext(StateContext);

  function handleClick(e){
    e.preventDefault();
    if (  (store.get("escort").AtiendoEnTarifaTransporte!==undefined && store.get("escort").AtiendoEnTarifaTransporte!=="" ) ||
          (store.get("escort").AtiendoEndireccion!==undefined && store.get("escort").AtiendoEndireccion!=="" ) ||
          (store.get("escort").AtiendoEnhotel!==undefined && store.get("escort").AtiendoEnhotel!=="" )
        ){

      let _inputs       =   inputs
          _inputs.data  =   JSON.stringify(store.get("escort"))
          _inputs.token =   user.token
      url_continue    =   e.target.href;
      inputs.user_id  =   store.get("user").user_id;
      Functions.PostAsync("User","setEscortDondeAtender",inputs,context,{name:"callbackContinue",funct:callbackContinue})

    }else {
      let modal = {
                status:true,
                title:"Campos incompletos",
                message:"Para completar el proceso de registro debes suministar el lugar donde atenderas",
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

              <div className="row justify-content-center mt-4">
                <div className="col-12 col-sm-6 text-center">
                  <div className="App-Question text-center">¿Dónde atenderé?</div>
                </div>
              </div>
            </div>
          </div>

          <div className="row justify-content-center">
            <div className="col-12 col-sm-4 text-center mt-3 ">
              <ContentBox gender={gender} setGender={_setGender} />
            </div>
          </div>

          <div className="row justify-content-md-center mt-4">
            <div className="col-12 col-sm-4 text-center mb-4">
              <Link onClick={handleClick} className="btn btn-primary btn-block btn-lg text-white text-decoration-none" href={Config.ConfigAppUrl+"Auth/EscortRegister11"} >
                Continuar
              </Link>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}

export default App;
