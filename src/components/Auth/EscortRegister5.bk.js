import React,{ useState } from 'react';
import '../../App.css';
import background from '../../assets/images/design/background.jpg';
import Link from '@material-ui/core/Link';
import Config from "../../helpers/config";
import Selector from "../Selector";


const divBackground = {
  backgroundImage: 'url(' + background + ')',
};

const  inputsDefault  = {
                          cuerpo:{
                            items:["Delgado","Nomal","Fitness","Con cirugías"],
                            selection:"Fitness",
                          },
                          piel:{
                            items:["Claro","Mestizo","Oscuro"],
                            selection:"Mestizo",
                          },
                        }

function App() {

  //const [btn, setBtn] = useState("Claro");
  const [inputs, setImputs] = useState(inputsDefault);

  return (
    <div className="App-LogoCenter App-splash" style={divBackground}>
      <form className="App-form App-form-register">
        <div className="container">
          <div className="row justify-content-center mb-4">
            <div className="col-12 col-sm-6 text-center">
              <div className="App-Question text-center">¡Ahora crea tu perfil y listo!</div>
            </div>
          </div>
          <div className="row justify-content-center mb-1">
            <div className="col-12 col-sm-6">
              <div className="App-Question text-left">Así soy yo</div>
            </div>
          </div>
          <div className="row justify-content-center mt-0">
            <div className="col-12 col-sm-4 text-center">
              <div className="input-group mb-3">
                <div className="input-group-prepend">
                  <span className="input-group-text">
                    <i className="fas fa-calendar"></i>
                  </span>
                </div>
                <input type="text" name="edad" className="form-control" placeholder="Edad"/>
                <div className="input-group-append">
                  <span className="input-group-text">
                    <i className="fas fa-chevron-right"></i>
                  </span>
                </div>
              </div>
              <div className="input-group mb-3">
                <div className="input-group-prepend">
                  <span className="input-group-text">
                    <i className="fas fa-ruler-vertical"></i>
                  </span>
                </div>
                <input type="text" name="estatura" className="form-control" placeholder="Estatura"/>
                <div className="input-group-append">
                  <span className="input-group-text">
                    <i className="fas fa-chevron-right"></i>
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="row justify-content-center mb-1">
            <div className="col-12 col-sm-6">
              <div className="App-Question text-left">Mi cuerpo es</div>
            </div>
          </div>
          <div className="row justify-content-center mt-0">
            <div className="col-12 col-sm-6">
              <Selector
                  setImputs={setImputs}
                  inputs={inputs}
                  name="cuerpo" />
            </div>
          </div>


          <div className="row justify-content-center mb-1">
            <div className="col-12 col-sm-6">
              <div className="App-Question text-left">Tono de piel</div>
            </div>
          </div>
          <div className="row justify-content-center mt-0">
            <div className="col-12 col-sm-6">
              <Selector
                  setImputs={setImputs}
                  inputs={inputs}
                  name="cuerpo" />
            </div>
          </div>


          <div className="row justify-content-md-center mt-0">
            <div className="col col-sm-6">
              <Link className="btn btn-primary btn-block btn-lg text-white text-decoration-none" href={Config.ConfigAppUrl+"Auth/EscortRegister6"} >
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
