import React from 'react';
import '../../App.css';
import logo from '../../assets/images/design/logo-vertical.png';
import male from '../../assets/images/design/image-default.jpg';
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
          <div className="row justify-content-center">
            <div className="col-4 col-sm-2 mb-4">
              <div className="btn btn-secondary btn-sq text-white p-0">
                <img className="img-fluid" src={male} alt="Hombre"/>
              </div>
            </div>
            <div className="col-4 col-sm-2 mb-4">
              <div  className="btn btn-secondary btn-sq text-white">
                <i className="fas fa-plus fa-4x mt-3"></i>
              </div>
            </div>
          </div>
          <div className="row justify-content-center mb-4">
            <div className="col-12 col-sm-6 text-center">
              <div className="App-Question text-center">¡Así te verán!</div>
            </div>
          </div>
          <div className="row justify-content-center mt-3">
            <div className="col-12 col-sm-6 text-center">
              <Link className="text-white text-decoration-none h6" href={Config.ConfigAppUrl+"Auth/Recover"} >
                Formatos JPG y PNG
              </Link>
            </div>
          </div>
          <div className="row justify-content-md-center mt-4">
            <div className="col col-sm-6">
              <Link className="btn btn-primary btn-block text-white text-decoration-none" href={Config.ConfigAppUrl+"Auth/Register6"} >
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
