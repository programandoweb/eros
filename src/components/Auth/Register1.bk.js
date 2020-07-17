import React from 'react';
import '../../App.css';
import background from '../../assets/images/resources/bg.png';
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
          <div className="row justify-content-center mb-4">
            <div className="col-12 col-sm-6 text-center">
              <div className="App-Question text-center">¿Qué deseas ser?</div>
              <input type="hidden" name="rol" placeholder="Nombre de usuario" aria-label="Amount (to the nearest dollar)"/>
            </div>
          </div>
          <div className="row justify-content-center mt-3">
            <div className="col-sm-6">
              <div className="row justify-content-center mt-3">
                <div className="col-12">
                  <div className="input-group-selection mb-3">
                    <Link className="text-decoration-none" href={Config.ConfigAppUrl+"Auth/ClientRegister0"} >
                      <div className="row text-dark">
                        <div className="col-2 border-right">
                          <i className="fas fa-user m-3"></i>
                        </div>
                        <div className="col-10 h4 p-2">Cliente</div>
                      </div>
                    </Link>
                  </div>
                </div>
                <div className="col-12">
                  <div className="input-group-selection mb-3">
                    <Link className="text-decoration-none" href={Config.ConfigAppUrl+"Auth/EscortRegister0"} >
                      <div className="row text-dark">
                        <div className="col-2 border-right">
                          <i className="fas fa-female m-3"></i>
                        </div>
                        <div className="col-10 h4 p-2">Escort</div>
                      </div>
                    </Link>
                  </div>
                </div>
                <div className="col-12">
                  <div className="input-group-selection mb-3">
                    <Link className="text-decoration-none" href={Config.ConfigAppUrl+"Auth/HotelRegister0"} >
                      <div className="row text-dark">
                        <div className="col-2 border-right">
                          <i className="fas fa-building m-3"></i>
                        </div>
                        <div className="col-10 h4 p-2">Hotel</div>
                      </div>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default App;
