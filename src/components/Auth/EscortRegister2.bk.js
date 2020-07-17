import React from 'react';
import '../../App.css';
import escort from '../../assets/images/design/image-escort.jpg';
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
          <div className="row justify-content-center mb-4">
            <div className="col-12 col-sm-6 text-center">
              <div className="App-Question text-center">Elige tu foto de perfil</div>
              <div className="text-white text-decoration-none h6" href={Config.ConfigAppUrl+"Auth/Recover"} >
                Formatos JPG y PNG
              </div>
            </div>
          </div>
          <div className="row justify-content-center">
            <div className="col-4 col-sm-2 mb-4">
              <div className="btn btn-secondary btn-sq-height text-white p-0">
                <img className="img-fluid" src={escort} alt="escort"/>
              </div>
            </div>
            <div className="col-4 col-sm-2 mb-4">
              <div  className="btn btn-secondary btn-sq-height text-white">
                <i className="fas fa-plus fa-4x mt-2"></i>
              </div>
            </div>
          </div>
          <div className="row justify-content-center mb-4">
            <div className="col-12 col-sm-6 text-center">
              <div className="App-Question text-center">Sube tus mejores fotos</div>
              <div className="text-white text-decoration-none h6" href={Config.ConfigAppUrl+"Auth/Recover"} >
                Máximo 5 fotos
              </div>
            </div>
          </div>
          <div className="row justify-content-center">
            <div className="col-4 col-sm-2 mb-4">
              <div className="btn btn-secondary btn-sq-height text-white p-0">
                <img className="img-fluid" src={escort} alt="escort"/>
              </div>
            </div>
            <div className="col-4 col-sm-2 mb-4">
              <div className="btn btn-secondary btn-sq-height text-white p-0">
                <img className="img-fluid" src={escort} alt="escort"/>
              </div>
            </div>
            <div className="col-4 col-sm-2 mb-4">
              <div className="btn btn-secondary btn-sq-height text-white p-0">
                <img className="img-fluid" src={escort} alt="escort"/>
              </div>
            </div>
            <div className="col-4 col-sm-2 mb-4">
              <div className="btn btn-secondary btn-sq-height text-white p-0">
                <img className="img-fluid" src={escort} alt="escort"/>
              </div>
            </div>
            <div className="col-4 col-sm-2 mb-4">
              <div className="btn btn-secondary btn-sq-height text-white p-0">
                <img className="img-fluid" src={escort} alt="escort"/>
              </div>
            </div>
            <div className="col-4 col-sm-2 mb-4">
              <div  className="btn btn-secondary btn-sq-height text-white">
                <i className="fas fa-plus fa-4x mt-2"></i>
              </div>
            </div>
          </div>
          <div className="row justify-content-md-center mt-4">
            <div className="col col-sm-6">
              <Link className="btn btn-primary btn-block btn-lg text-white text-decoration-none" href={Config.ConfigAppUrl+"Auth/EscortRegister3"} >
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
