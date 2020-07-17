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

        <div className="container">
          <div className="row justify-content-center">
              <div className="col-12 col-sm-4 text-left background-gray2 pb-3 mt-4">
                <div className="leter text-center  App-Question--x2 ">
                  ¿Quién soy?
                </div>

                <div className="text-gray text-left pt-3 pb-3">
                  Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                  Lorem Ipsum has been the industry's standard dummy text ever since the 1500s
                </div>

              </div>
          </div>
        </div>


        <div className="container">
          <div className="row justify-content-center">
              <div className="col-12 col-sm-4 text-left background-gray2 pb-3 ">
                <div className="leter text-left  App-Question--x2 ">
                  Más detalles
                </div>
              </div>
          </div>
        </div>


        <div className="container">
          <div className="row justify-content-center">
              <div className="col-6 col-sm-2 text-left background-gray2 pb-3">
                <div className="App-Question--x2 text-left ">
                  Mido
                </div>
              </div>

              <div className="col-6 col-sm-2 text-left background-gray2 pb-3">
                <div className="text-gray text-right">
                  1.55 cm
                </div>
              </div>
          </div>
        </div>


        <div className="container">
          <div className="row justify-content-center">
              <div className="col-6 col-sm-2 text-left background-gray2 pb-3">
                <div className="App-Question--x2 text-left ">
                  Contextura
                </div>
              </div>

              <div className="col-6 col-sm-2 text-left background-gray2 pb-3">
                <div className="text-gray text-right">
                  Fitness
                </div>
              </div>
          </div>
        </div>


        <div className="container">
          <div className="row justify-content-center">
              <div className="col-6 col-sm-2 text-left background-gray2 pb-3">
                <div className="App-Question--x2 text-left ">
                  Cabello
                </div>
              </div>

              <div className="col-6 col-sm-2 text-left background-gray2 pb-3">
                <div className="text-gray text-right">
                  Largo
                </div>
              </div>
          </div>
        </div>


        <div className="container">
          <div className="row justify-content-center">
              <div className="col-6 col-sm-2 text-left background-gray2 pb-3">
                <div className="App-Question--x2 text-left ">
                  Color de cabello
                </div>
              </div>

              <div className="col-6 col-sm-2 text-left background-gray2 pb-3">
                <div className="text-gray text-right">
                  Rubio
                </div>
              </div>
          </div>
        </div>


        <div className="container">
          <div className="row justify-content-center">
              <div className="col-6 col-sm-2 text-left background-gray2 pb-3">
                <div className="App-Question--x2 text-left ">
                  Color de ojos
                </div>
              </div>

              <div className="col-6 col-sm-2 text-left background-gray2 pb-3">
                <div className="text-gray text-right">
                  Café
                </div>
              </div>
          </div>
        </div>


        <div className="container">
          <div className="row justify-content-center">
              <div className="col-6 col-sm-2 text-left background-gray2 pb-3">
                <div className="App-Question--x2 text-left ">
                  ¿Fumo?
                </div>
              </div>

              <div className="col-6 col-sm-2 text-left background-gray2 pb-3">
                <div className="text-gray text-right">
                  No
                </div>
              </div>
          </div>
        </div>


        <div className="container">
          <div className="row justify-content-center">
              <div className="col-6 col-sm-2 text-left background-gray2 pb-3">
                <div className="App-Question--x2 text-left ">
                  ¿Bebo?
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
                  Cirugias estéticas
                </div>
              </div>

              <div className="col-6 col-sm-2 text-left background-gray2 pb-3 ">
                <div className="text-gray text-right">
                  Senos, Cola, Bichectomia
                </div>
              </div>
          </div>
        </div>


        <div className="container">
          <div className="row justify-content-center">
              <div className="col-6 col-sm-2 text-left background-gray2 pb-3 mb-4">
                <div className="App-Question--x2 text-left ">
                  Hobbies & Gustos:
                </div>
              </div>

              <div className="col-6 col-sm-2 text-left background-gray2 pb-3 mb-4">
                <div className="text-gray text-right">
                  Bailar, Cine, Gimnasio, Viajar,
                  Snuf, Videojuegos, Conciertos,
                  Paracaidismo, Perforaciones
                </div>
              </div>
          </div>
        </div>

      </form>
    </div>
  )
}

export default App;
