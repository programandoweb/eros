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
              <div className="App-Question text-center">Registro inicial</div>
              <input type="hidden" name="rol" placeholder="Nombre de usuario" aria-label="Amount (to the nearest dollar)"/>
            </div>
          </div>
          <div className="row justify-content-center mt-3">
            <div className="col-12 col-sm-4">
              <div className="input-group-selection mb-3">
                <div className="row text-dark">
                  <div className="col-2 border-right">
                    <i className="fas fa-user m-3"></i>
                  </div>
                  <div className="col-10 h4 p-2">Cliente</div>
                </div>
              </div>
            </div>
            <div className="col-12 col-sm-4">
              <div className="input-group-selection mb-3">
                <div className="row text-dark">
                  <div className="col-2 border-right">
                    <i className="fas fa-female m-3"></i>
                  </div>
                  <div className="col-10 h4 p-2">Escort</div>
                </div>
              </div>
            </div>
            <div className="col-12 col-sm-4">
              <div className="input-group-selection mb-3">
                <div className="row text-dark">
                  <div className="col-2 border-right">
                    <i className="fas fa-building m-3"></i>
                  </div>
                  <div className="col-10 h4 p-2">Hotel</div>
                </div>
              </div>
            </div>
          </div>
          <div className="row justify-content-md-center mt-4">
            <div className="col col-sm-6">
              <Link className="btn btn-primary btn-block text-white text-decoration-none" href={Config.ConfigAppUrl+"Auth/Register3"} >
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
