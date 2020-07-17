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
              <div className="App-Question text-center">Sube tus videos aquí</div>
              <div className="text-white text-decoration-none h6" href={Config.ConfigAppUrl+"Auth/Recover"} >
                Máximo 4 videos
              </div>
            </div>
          </div>
          <div className="row justify-content-center">
            <div className="col-12 col-sm-2 mb-4">
              <div  className="btn btn-secondary btn-sq-fw text-white">
                <i className="fas fa-plus fa-4x mt-3"></i>
              </div>
            </div>
          </div>
          <div className="row justify-content-center mb-4">
            <div className="col-12 col-sm-6 text-center">
              <div className="text-white text-decoration-none h6" href={Config.ConfigAppUrl+"Auth/Recover"} >
                Límite 150 MB.
              </div>
            </div>
          </div>
          <div className="row justify-content-center mb-4">
            <div className="col-12 col-sm-6 text-center">
              <div className="App-Question text-left">Tus videos</div>
            </div>
          </div>
          <div className="row justify-content-center">
            <div className="col-4 col-sm-2 mb-4">
              <div className="btn btn-secondary btn-sq text-white p-0">
                <img className="img-fluid" src={escort} alt="escort"/>
              </div>
            </div>
            <div className="col-4 col-sm-2 mb-4">
              <div className="btn btn-secondary btn-sq text-white p-0">
                <img className="img-fluid" src={escort} alt="escort"/>
              </div>
            </div>
            <div className="col-4 col-sm-2 mb-4">
              <div className="btn btn-secondary btn-sq text-white p-0">
                <img className="img-fluid" src={escort} alt="escort"/>
              </div>
            </div>
          </div>
          <div className="row justify-content-md-center mt-4">
            <div className="col col-sm-6">
              <Link className="btn btn-primary btn-block btn-lg text-white text-decoration-none" href={Config.ConfigAppUrl+"Auth/EscortRegister5"} >
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
