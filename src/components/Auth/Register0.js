import React from 'react';
import '../../App.css';
import logo from '../../assets/images/design/logo-vertical.png';
import background from '../../assets/images/design/background.jpg';
import Link from '@material-ui/core/Link';
import Config from "../../helpers/config";


const divBackground = {
  backgroundImage: 'url(' + background + ')',
};

function App() {

  return (
    <div className="App-LogoCenter App-splash" style={divBackground}>
      <form className="App-form App-form-register">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-7 col-sm-4 text-center">
              <img className="img-fluid" src={logo} alt="ErosApp"/>
            </div>
          </div>
          <div className="row justify-content-center mb-4">
            <div className="col-12 col-sm-6 text-center">
              <div className="App-Question text-center">Datos adicionales</div>
            </div>
          </div>
          <div className="row justify-content-center mt-3">
            <div className="col-12 col-sm-4 text-center">
              <div className="input-group mb-3">
                <div className="input-group-prepend">
                  <span className="input-group-text">
                    <i className="fas fa-address-card"></i>
                  </span>
                </div>
                <input type="text" name="login" className="form-control" placeholder="Nacionalidad"/>
              </div>
              <div className="input-group mb-3">
                <div className="input-group-prepend">
                  <span className="input-group-text">
                    <i className="fas fa-envelope"></i>
                  </span>
                </div>
                <input type="text" name="email" className="form-control" placeholder="Correo electrónico"/>
              </div>
              <div className="input-group mb-3">
                <div className="input-group-prepend">
                  <span className="input-group-text">
                    <i className="fas fa-phone-alt"></i>
                  </span>
                </div>
                <input type="text" name="telefono" className="form-control" placeholder="Número telefónico"/>
              </div>
            </div>
          </div>
          <div className="row justify-content-md-center mt-4">
            <div className="col col-sm-6">
              <Link className="btn btn-primary btn-block text-white text-decoration-none" href={Config.ConfigAppUrl+"Auth/Register4"} >
                Continuar
              </Link>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default App;
