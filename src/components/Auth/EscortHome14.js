import React,{useState,useEffect} from 'react';
import '../../App.css';
import logo from '../../assets/images/resources/icon-eroscoin.png';
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

            <div className="col-7 col-sm-3 text-center">
              <div className="App-Question--x2  text-fucsia text-center mb-5">Bonos y referidos</div>
              <img className="img-fluid mt-5" src={logo} alt="ErosApp"/>
            </div>
          </div>
          <div className="row justify-content-center mt-4 mb-4">
            <div className="col-12 col-sm-4 text-center">
              <div className="App-Question  text-center">Vaya, aún no tienes bonos.</div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default App;
