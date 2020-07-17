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
        <div className="row justify-content-center  ">
            <div className="col-12 col-sm-6 text-left background-text3 p-2">
              <div className="text-pink text-center">
                Marzo 2020
              </div>
            </div>
        </div>
      </div>

        <div className="container">
          <div className="row justify-content-center">
              <div className="col-4 col-sm-2 text-left background-gray p-2">
                <div className="App-Question--x2 text-center">
                  Lucho$
                </div>
                <div className="text-gray text-center ">
                  10/03/2020
                </div>
              </div>

              <div className="col-4 col-sm-2 text-left background-gray p-2">
                <div className="text-gray text-center">
                  Escort
                </div>
              </div>

              <div className="col-4 col-sm-2 text-left background-gray p-2">
                <div className="App-Question--x2 text-center">
                  EC $150
                </div>
                <div className="text-gray text-center">
                  $150.000
                </div>
              </div>
          </div>
        </div>


        <div className="container">
          <div className="row justify-content-center  ">
              <div className="col-4 col-sm-2 text-left background-text4 p-2">
                <div className="App-Question--x2 text-center">
                  Lucho$
                </div>
                <div className="text-gray text-center">
                  10/03/2020
                </div>
              </div>

              <div className="col-4 col-sm-2 text-left background-text4 p-2">
                <div className="text-gray text-center">
                  Escort
                </div>
              </div>

              <div className="col-4 col-sm-2 text-left background-text4 p-2">
                <div className="App-Question--x2 text-center">
                  EC $150
                </div>
                <div className="text-gray text-center">
                  $150.000
                </div>
              </div>
          </div>
        </div>


        <div className="container">
          <div className="row justify-content-center  ">
              <div className="col-4 col-sm-2 text-left background-gray p-2">
                <div className="App-Question--x2 text-center">
                  Lucho$
                </div>
                <div className="text-gray text-center">
                  10/03/2020
                </div>
              </div>

              <div className="col-4 col-sm-2 text-left background-gray p-2">
                <div className="text-gray text-center">
                  Escort
                </div>
              </div>

              <div className="col-4 col-sm-2 text-left background-gray p-2">
                <div className="App-Question--x2 text-center">
                  EC $150
                </div>
                <div className="text-gray text-center">
                  $150.000
                </div>
              </div>
          </div>
        </div>


        <div className="container">
          <div className="row justify-content-center  ">
              <div className="col-4 col-sm-2 text-left background-text4 p-2">
                <div className="App-Question--x2 text-center">
                  Lucho$
                </div>
                <div className="text-gray text-center">
                  10/03/2020
                </div>
              </div>

              <div className="col-4 col-sm-2 text-left background-text4 p-2">
                <div className="text-gray text-center">
                  Escort
                </div>
              </div>

              <div className="col-4 col-sm-2 text-left background-text4 p-2">
                <div className="App-Question--x2 text-center">
                  EC $150
                </div>
                <div className="text-gray text-center">
                  $150.000
                </div>
              </div>
          </div>
        </div>


        <div className="container">
          <div className="row justify-content-center  ">
              <div className="col-4 col-sm-2 text-left background-gray p-2">
                <div className="App-Question--x2 text-center">
                  Lucho$
                </div>
                <div className="text-gray text-center">
                  10/03/2020
                </div>
              </div>

              <div className="col-4 col-sm-2 text-left background-gray p-2">
                <div className="text-gray text-center">
                  Escort
                </div>
              </div>

              <div className="col-4 col-sm-2 text-left background-gray p-2">
                <div className="App-Question--x2 text-center">
                  EC $150
                </div>
                <div className="text-gray text-center">
                  $150.000
                </div>
              </div>
          </div>
        </div>

        <div className="container">
          <div className="row justify-content-center  ">
              <div className="col-4 col-sm-2 text-left background-text4 p-2">
                <div className="App-Question--x2 text-center">
                  Lucho$
                </div>
                <div className="text-gray text-center">
                  10/03/2020
                </div>
              </div>

              <div className="col-4 col-sm-2 text-left background-text4 p-2">
                <div className="text-gray text-center">
                  Escort
                </div>
              </div>

              <div className="col-4 col-sm-2 text-left background-text4 p-2">
                <div className="App-Question--x2 text-center">
                  EC $150
                </div>
                <div className="text-gray text-center">
                  $150.000
                </div>
              </div>
          </div>
        </div>


        <div className="container">
          <div className="row justify-content-center  ">
              <div className="col-12 col-sm-6 text-left background-text3 p-2">
                <div className="text-pink text-center">
                  Febrero 2020
                </div>
              </div>
          </div>
        </div>



        <div className="container">
          <div className="row justify-content-center  ">
              <div className="col-4 col-sm-2 text-left background-gray p-2">
                <div className="App-Question--x2 text-center">
                  Lucho$
                </div>
                <div className="text-gray text-center">
                  10/03/2020
                </div>
              </div>

              <div className="col-4 col-sm-2 text-left background-gray p-2">
                <div className="text-gray text-center">
                  Escort
                </div>
              </div>

              <div className="col-4 col-sm-2 text-left background-gray p-2">
                <div className="App-Question--x2 text-center">
                  EC $150
                </div>
                <div className="text-gray text-center">
                  $150.000
                </div>
              </div>
          </div>
        </div>


        <div className="container">
          <div className="row justify-content-center">
              <div className="col-4 col-sm-2 text-left background-text4 p-2">
                <div className="App-Question--x2 text-center">
                  Lucho$
                </div>
                <div className="text-gray text-center">
                  10/03/2020
                </div>
              </div>

              <div className="col-4 col-sm-2 text-left background-text4 p-2">
                <div className="text-gray text-center">
                  Escort
                </div>
              </div>

              <div className="col-4 col-sm-2 text-left background-text4 p-2">
                <div className="App-Question--x2 text-center">
                  EC $150
                </div>
                <div className="text-gray text-center">
                  $150.000
                </div>
              </div>
          </div>
        </div>



      </form>
    </div>
  );
}

export default App;
