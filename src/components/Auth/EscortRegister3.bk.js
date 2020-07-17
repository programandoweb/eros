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
          <div className="row justify-content-center">
            <div className="col-11 col-sm-2 mb-4">
              <div className="btn btn-secondary btn-sq-main text-white p-0">
                <img className="img-fluid" src={escort} alt="escort"/>
              </div>
            </div>
          </div>

          <div className="row justify-content-center mb-4">
            <div className="col-11 col-sm-6 text-center">
              <div className="App-Question text-center">Edita tu foto</div>
            </div>
          </div>
          <div className="row justify-content-center">
            <div className="col-10">
              <div className="row">
                <div className="col-3 col-sm-2 mb-4 p-0">
                  <div className=" border btn-sq-height">
                    a
                  </div>
                </div>
                <div className="col-3 col-sm-2 mb-4 p-0">
                  <div className=" border btn-sq-height">
                    a
                  </div>
                </div>
                <div className="col-3 col-sm-2 mb-4 p-0">
                  <div className=" border btn-sq-height">
                    a
                  </div>
                </div>
                <div className="col-3 col-sm-2 mb-4 p-0">
                  <div className=" border btn-sq-height">
                    a
                  </div>
                </div>
              </div>
              <div className="row justify-content-md-center mt-0">
                <Link className="btn btn-primary btn-block btn-lg text-white text-decoration-none" href={Config.ConfigAppUrl+"Auth/EscortRegister4"} >
                  Continuar
                </Link>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default App;
