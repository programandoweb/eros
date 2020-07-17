import React,{ useState , useEffect } from 'react';
import '../../App.css';
import logo from '../../assets/images/design/logo-vertical.png';
import background from '../../assets/images/design/background.jpg';
import Config from "../../helpers/config";


const divBackground = {
  backgroundImage: 'url(' + background + ')',
};

function App() {

  let [clock, setClock] = useState(10);

  let prevNowPlaying  = false;

  useEffect(() => {
    handleInitClock();
  },[]);

  function handleInitClock(){
    prevNowPlaying = setInterval(function () {
      setClock(clock--);
      if (clock < 0) {
        clearInterval(prevNowPlaying);
      }
    }, 1000);
  }

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
              <div className="App-Question text-center">Verifica tu cuenta</div>
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
                <input type="text" name="login" className="form-control" placeholder="Digitar código de verificación"/>
              </div>
            </div>
          </div>
          <div className="row justify-content-md-center mt-4">
            <div className="col col-sm-6">
              <a  className="btn btn-primary btn-block text-white text-decoration-none" href={Config.ConfigAppUrl+"Auth/Register5"} >
                {(clock>0)?'Enviar código':'Reenviar código de verificación'} ({clock})
              </a>
            </div>
          </div>
          {(clock===0)?<div className="row justify-content-center mt-3">
                      <div className="col-12 col-sm-6 text-center">
                        <div className="text-white text-decoration-none h6">
                          ¿No recibiste el código de verificación?
                        </div>
                      </div>
                      <div className="col-12 col-sm-6 text-center">
                        <div className="text-white text-decoration-none h6">
                          <b className="h6"> Dirígete aquí </b> para reenviar un nuevo código de verificación
                        </div>
                      </div>
                    </div>:<div></div>}
        </div>
      </form>
    </div>
  );
}

export default App;
