import React from 'react';
import alert from '../assets/images/design/alert.png';
import '../App.css';

function App() {
  return (
    <div className="App-LogoCenter">
      <div className="container">
        <div className="row justify-content-md-center">
          <div className="col-12 col-sm-6 text-center">
            <img className="img-fluid" src={alert} alt="ErosApp Alerta"/>
            <div className="App-Question">No tienes la edad permitida para continuar</div>
            <p className="App-Description">Gracias por visitar <b>ErosApp</b>.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
