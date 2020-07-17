import React from 'react';
import alert from '../assets/images/design/alert.png';
import Config from "../helpers/config";
import Link from '@material-ui/core/Link';
import '../App.css';

function App() {
  return (
    <div className="App-LogoCenter">
      <div className="container">
        <div className="row justify-content-md-center">
          <div className="col-12 col-sm-6 text-center">
            <img className="img-fluid" src={alert} alt="ErosApp Alerta"/>
            <div className="App-Question">¿Eres Mayor de edad?</div>
            <p className="App-Description">Para continuar en la plataforma <b>ErosApp</b>, debes ser mayor de edad.</p>
          </div>
        </div>
        <div className="row justify-content-md-center">
          <div className="col-6 col-sm-3">
            <Link className="btn btn-primary btn-block btn-lg text-white text-decoration-none" href={Config.ConfigAppUrl+"Auth/Login"} >
              Si, continuar
            </Link>
          </div>
          <div className="col-6 col-sm-3">
            <Link className="btn btn-secondary btn-block btn-lg text-white text-decoration-none" href={Config.ConfigAppUrl+"NotAgePermited"} >
              No, salir
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
