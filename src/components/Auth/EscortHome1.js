import React, {useState} from 'react';
import '../../App.css';
import logo from '../../assets/images/resources/erosapp-user-check.png';
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
        <div className="container">
          <div className="row justify-content-center set_width_container">
            <div className="col-sm-6">
            <div className="row justify-content-center">
              <div className="row justify-content-center">
                <div className="col-12 col-sm-10 text-center">
                  <div className="App-Question text-center text-fucsia">Notificaciones </div>
                </div>
              </div>
            </div>

              <div className="row justify-content-center mt-5 ">
                <div className="col-12 col-sm-8 ">
                  <div className="leter text-left  text-fucsia background-text3 p-2 ">Hoy</div>
                </div>
              </div>

              <div className="row justify-content-center mt-3 ">
                <div className="col-12 col-sm-8 text-left">
                  <div className="App-Question--x2 ">Luis$</div>
                  <div className="text-gray ">Solicito el servicio escort para
                  la fecha 10/2/20 desde las 10:00pm hasta las 11:00pm.
                  </div>
                  <div className="App-Question--x2  text-fucsia mt-2 mb-3 border-bottom">Eliminar</div>
                </div>
              </div>

              <div className="row justify-content-center mt-3 ">
                <div className="col-12 col-sm-8 text-left">
                  <div className="App-Question--x2 ">Luis$</div>
                  <div className="text-gray ">Solicito el servicio escort para
                  la fecha 10/2/20 desde las 10:00pm hasta las 11:00pm.
                  </div>
                  <div className="App-Question--x2  text-fucsia mt-2 mb-3">Eliminar</div>
                </div>
              </div>

              <div className="row justify-content-center mt-1 ">
                <div className="col-12 col-sm-8 text-center">
                  <div className="leter text-left  text-fucsia background-text3 p-2 ">Ayer</div>
                </div>
              </div>

              <div className="row justify-content-center mt-3 ">
                <div className="col-12 col-sm-8 text-left">
                  <div className="App-Question--x2 ">Administrador</div>
                  <div className="text-gray ">Hola Sexy20, bienvenida a la plataforma
                  Erosapp! Ya puedes empezar a ofrecer tus servicios.
                  </div>
                  <div className="App-Question--x2  text-fucsia mt-2 mb-3 border-bottom">Eliminar</div>
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
