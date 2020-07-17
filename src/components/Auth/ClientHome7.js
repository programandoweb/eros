import React,{useState,useEffect} from 'react';
import '../../App.css';

import background from '../../assets/images/design/bg-erosapp-clientes.png';

import Config from "../../helpers/config";

import StateContext from '../../helpers/contextState'
import Functions from "../../helpers/functions";
import store from "../../helpers/store";


const divBackground = {
  backgroundImage: 'url(' + background + ')',
};


let escort= store.get("escort");

function App() {

  const [inputs, setInputs] = useState({
                                          ano:"",
                                          mes:"",
                                          dia:"",
                                        });

  const context             =   React.useContext(StateContext);
  const url_continue        =   Config.ConfigAppUrl+"Auth/EscortRegister4";


  function callbackContinue(data){
    let insert  = store.get("escort");
        Object.entries(inputs).map((v)=>{
          insert[v[0]]=v[1]
        })
    store.set("escort",insert);
    document.location.href  = url_continue;
  }


  function handleClick(e){
    e.preventDefault();

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


    url_continue=e.target.href;
    let send  =   store.get("motel");
        send.user_id=store.get("user").user_id
    Functions.PostAsync("User","setMotel",send,context,{name:"callbackContinue",funct:callbackContinue})
  }


  return (
    <div className="App-LogoCenter App-splash" style={divBackground}>
      <form className="App-form App-form-register">


        <div className="container">
          <div className="row justify-content-center mt-3">
              <div className="col-12 col-sm-4 text-left background-gray ">
                <div className="text-left App-Question--x2">
                  ¡Carla10 le interesa tu solicitud!
                </div>
                <div className="text-fucsia text-left pb-3 ">
                  Ver perfil
                </div>
              </div>
          </div>
        </div>

        <div className="container">
          <div className="row justify-content-center">
              <div className="col-6 col-sm-2 text-left background-gray pb-2">
                <div onClick={handleClick} className="btn btn-primary btn-block btn-lg text-white text-decoration-none"
                  href={Config.ConfigAppUrl+"Auth/HotelRegister5"} >
                  Rechazar
                </div>
              </div>

              <div className="col-6 col-sm-2 text-left background-gray">
                <div onClick={handleClick} className="btn btn-primary btn-block btn-lg text-white text-decoration-none"
                  href={Config.ConfigAppUrl+"Auth/HotelRegister5"} >
                  Aceptar
                </div>
              </div>
          </div>
        </div>


        <div className="container">
          <div className="row justify-content-center mt-3">
              <div className="col-12 col-sm-4 text-left background-gray ">
                <div className="text-left App-Question--x2">
                  ¡Gata11 le interesa tu solicitud!
                </div>
                <div className="text-fucsia text-left pb-3 ">
                  Ver perfil
                </div>
              </div>
          </div>
        </div>

        <div className="container">
          <div className="row justify-content-center">
              <div className="col-6 col-sm-2 text-left background-gray pb-2">
                <div onClick={handleClick} className="btn btn-primary btn-block btn-lg text-white text-decoration-none"
                  href={Config.ConfigAppUrl+"Auth/HotelRegister5"} >
                  Rechazar
                </div>
              </div>

              <div className="col-6 col-sm-2 text-left background-gray">
                <div onClick={handleClick} className="btn btn-primary btn-block btn-lg text-white text-decoration-none"
                  href={Config.ConfigAppUrl+"Auth/HotelRegister5"} >
                  Aceptar
                </div>
              </div>
          </div>
        </div>


        <div className="container">
          <div className="row justify-content-center mt-3">
              <div className="col-12 col-sm-4 text-left background-gray ">
                <div className="text-left App-Question--x2">
                  ¡Gertrudiz le interesa tu solicitud!
                </div>
                <div className="text-fucsia text-left pb-3 ">
                  Ver perfil
                </div>
              </div>
          </div>
        </div>

        <div className="container">
          <div className="row justify-content-center">
              <div className="col-6 col-sm-2 text-left background-gray pb-2">
                <div onClick={handleClick} className="btn btn-primary btn-block btn-lg text-white text-decoration-none"
                  href={Config.ConfigAppUrl+"Auth/HotelRegister5"} >
                  Rechazar
                </div>
              </div>

              <div className="col-6 col-sm-2 text-left background-gray">
                <div onClick={handleClick} className="btn btn-primary btn-block btn-lg text-white text-decoration-none"
                  href={Config.ConfigAppUrl+"Auth/HotelRegister5"} >
                  Aceptar
                </div>
              </div>
          </div>
        </div>

      </form>
    </div>
  );
}

export default App;
