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

function App() {

  const context             =   React.useContext(StateContext);
  const url_continue        =   Config.ConfigAppUrl+"Auth/EscortRegister4";

  function callbackContinue(data){
    let insert  = store.get("escort");

    store.set("escort",insert);
    document.location.href  = url_continue;
  }


  function handleClick(e){
    e.preventDefault();

  


    let send  =   store.get("motel");
        send.user_id=store.get("user").user_id
    Functions.PostAsync("User","setMotel",send,context,{name:"callbackContinue",funct:callbackContinue})
  }


  return (
    <div className="App-LogoCenter App-splash" style={divBackground}>
      <form className="App-form App-form-register">


        <div className="row justify-content-center mt-4 ">
          <div className="col-12 col-sm-8  ">
            <div className=" text-center p-2 App-Question--x2 mb-4">
              Sexy20, 29
            </div>
          </div>
        </div>

        <div className="container">
          <div className="row justify-content-center">
              <div className="col-6 col-sm-2 text-left  pb-2">
                <div className="text-left App-Question--x2">
                  $100 Eroscoin
                </div>
                <div className="App-Question--x2  text-fucsia text-left pb-3 ">
                  COP $50.000
                </div>
              </div>

              <div className="col-6 col-sm-2 text-left ">
                <div onClick={handleClick} className="btn btn-primary btn-block btn-lg text-white text-decoration-none"
                  href={Config.ConfigAppUrl+"Auth/HotelRegister5"} >
                  Aceptar
                </div>
              </div>
          </div>
        </div>


        <div className="container">
          <div className="row justify-content-center mt-3 mb-4">
              <div className="col-12 col-sm-4 text-left  ">
                <div onClick={handleClick} className="btn btn-primary btn-block btn-lg text-white text-decoration-none"
                  href={Config.ConfigAppUrl+"Auth/HotelRegister5"} >
                  Recarga tu saldo
                </div>
              </div>
          </div>
        </div>


        <div className="container">
          <div className="row justify-content-center mt-3 mb-4">
              <div className="col-12 col-sm-4 text-left  ">
              <div className=" text-left p-2 App-Question--x2 ">
                Detalles del pago
              </div>
              </div>
          </div>
        </div>


        <div className="container">
          <div className="row justify-content-center">
              <div className="col-6 col-sm-2 text-left  pb-2 background-text2">
                <div className="text-left App-Question--x2 ">
                  Striptease
                </div>
                <div className="text-gray text-left pb-3 ">
                  Valor del servicio
                </div>
              </div>

              <div className="col-6 col-sm-2 text-left  pb-2 background-text2">
                <div className="text-right App-Question--x2">
                  $200
                </div>
                <div className="App-Question--x2  text-fucsia text-right pb-3 ">
                  COP $100.000
                </div>
              </div>
          </div>
        </div>


        <div className="container">
          <div className="row justify-content-center">
              <div className="col-6 col-sm-2 text-left  pb-4 background-text4 ">
                <div className="text-left App-Question--x2 ">
                  A domicilio
                </div>
                <div className="text-gray text-left pb-3 ">
                  Valor del servicio
                </div>
              </div>

              <div className="col-6 col-sm-2 text-left  pb-4 background-text4">
                <div className="text-right App-Question--x2">
                  $20
                </div>
                <div className="App-Question--x2  text-fucsia text-right pb-3 ">
                  COP $10.000
                </div>
              </div>
          </div>
        </div>


        <div className="container">
          <div className="row justify-content-center">
              <div className="col-6 col-sm-2 text-left  pb-3 ">
                <div className="text-left App-Question--x2 pt-4">
                  Total a pagar
                </div>
              </div>

              <div className="col-6 col-sm-2 text-left ">
                <div className="text-right App-Question--x2 pt-3">
                  $200
                </div>
                <div className="App-Question--x2  text-fucsia text-right pb-3 ">
                  COP $110.000
                </div>
              </div>
          </div>
        </div>


        <div className="container">
          <div className="row justify-content-center">
              <div className="col-6 col-sm-2 text-left  pb-3 ">
                <div onClick={handleClick} className="btn btn-ClientHome btn-block btn-lg text-white text-decoration-none" href={Config.ConfigAppUrl+"Auth/HotelRegister5"} >
                  Usar bono
                </div>
              </div>

              <div className="col-6 col-sm-2 text-left ">
                <div onClick={handleClick} className="btn btn-primary btn-block btn-lg text-white text-decoration-none"
                  href={Config.ConfigAppUrl+"Auth/HotelRegister5"} >
                  Pagar
                </div>
              </div>
          </div>
        </div>

      </form>
    </div>
  );
}

export default App;
