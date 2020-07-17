import React,{useState,useEffect} from 'react';
import '../../App.css';
import background from '../../assets/images/design/bg-cliente.jpeg';

const divBackground = {
  backgroundImage: 'url(' + background + ')',
};

function App() {
  return (
    <div className="App-LogoCenter App-splash" style={divBackground}>
      <form className="App-form App-form-register">
        <div className="container">
          <div className="row justify-content-center">
              <div className="col-4 col-sm-2 text-left background-gray rounded-left">
                <div className="text-gray text-left ">
                  Cliente
                </div>
                <div className="App-Question--x2 text-left ">
                  Lucho$
                </div>
              </div>

              <div className="col-3 col-sm-2 text-left background-gray">
                <div className="text-gray text-center">
                  imagen
                </div>
              </div>

              <div className="col-5 col-sm-2 text-left background-gray rounded-right">
                <div className="text-gray text-right">
                  03 / 03 / 2020
                </div>
                <div className="App-Question--x2 text-right">
                  Servicio tomado
                </div>
              </div>
          </div>
        </div>


        <div className="container">
          <div className="row justify-content-center mt-3">
              <div className="col-4 col-sm-2 text-left background-gray rounded-left">
                <div className="text-gray text-left">
                  Escort
                </div>
                <div className="App-Question--x2 text-left ">
                  DannaX
                </div>
              </div>

              <div className="col-3 col-sm-2 text-left background-gray">
                <div className="text-gray text-center">
                  imagen
                </div>
              </div>

              <div className="col-5 col-sm-2 text-left background-gray rounded-right">
                <div className="text-gray text-right">
                  03 / 03 / 2020
                </div>
                <div className="App-Question--x2 text-right">
                  Servicio prestado
                </div>
              </div>
          </div>
        </div>


        <div className="container">
          <div className="row justify-content-center mt-3">
              <div className="col-4 col-sm-2 text-left background-gray rounded-left">
                <div className="text-gray text-left">
                  Cliente
                </div>
                <div className="App-Question--x2 text-left ">
                  Lucho$
                </div>
              </div>

              <div className="col-3 col-sm-2 text-left background-gray">
                <div className="text-gray text-center">
                  imagen
                </div>
              </div>

              <div className="col-5 col-sm-2 text-left background-gray rounded-right">
                <div className="text-gray text-right">
                  03 / 03 / 2020
                </div>
                <div className="App-Question--x2 text-right">
                  Servicio tomado
                </div>
              </div>
          </div>
        </div>


        <div className="container">
          <div className="row justify-content-center mt-3">
              <div className="col-4 col-sm-2 text-left background-gray rounded-left">
                <div className="text-gray text-left">
                  Escort
                </div>
                <div className="App-Question--x2 text-left ">
                  DannaX
                </div>
              </div>

              <div className="col-3 col-sm-2 text-left background-gray">
                <div className="text-gray text-center">
                  imagen
                </div>
              </div>

              <div className="col-5 col-sm-2 text-left background-gray rounded-right">
                <div className="text-gray text-right">
                  03 / 03 / 2020
                </div>
                <div className="App-Question--x2 text-right">
                  Servicio prestado
                </div>
              </div>
          </div>
        </div>

      </form>
    </div>
  );
}

export default App;
