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
              <div className="App-Question text-center">¡Ahora, crea tu perfil y listo!</div>
            </div>
          </div>
          <div className="row justify-content-center mt-3">
            <div className="col-12 col-sm-4">
              <label className="text-subtitulos">¿Cómo te describes?</label>
              <div className="input-group mb-3">
                <textarea className="form-control form-control-textarea"  placeholder="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."></textarea>
              </div>
            </div>
          </div>
          <div className="row justify-content-md-center mt-4">
            <div className="col col-sm-6">
              <Link className="btn btn-primary btn-block btn-lg text-white text-decoration-none" href={Config.ConfigAppUrl+"Auth/EscortRegister2"} >
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
