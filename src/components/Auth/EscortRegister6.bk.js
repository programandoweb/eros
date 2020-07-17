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
                          estiloCabello:{
                            items:["Largo","Corto"],
                            selection:"Largo",
                          },
                          colorCabello:{
                            items:["Negro","Castaño","Rubio","Pelirojo"],
                            selection:"Negro",
                          },
                          colorOjos:{
                            items:["Negro","Café","Azul","Verde"],
                            selection:"Negro",
                          },
                        }

function App() {

  const [inputs, setImputs] = useState(inputsDefault);
  
  return (
    <div className="App-LogoCenter App-splash" style={divBackground}>
      <form className="App-form App-form-register">
        <div className="container">
          <div className="row justify-content-center mb-1">
            <div className="col-12 col-sm-6">
              <div className="App-Question text-left">Estilo de cabello</div>
            </div>
          </div>
          <div className="row justify-content-center mt-0">
            <div className="col-12 col-sm-6">
              <Selector
                  setImputs={setImputs}
                  inputs={inputs}
                  name="estiloCabello" />
            </div>
          </div>

          <div className="row justify-content-center mb-1">
            <div className="col-12 col-sm-6">
              <div className="App-Question text-left">Color de cabello</div>
            </div>
          </div>
          <div className="row justify-content-center mt-0">
            <div className="col-12 col-sm-6">
              <Selector
                  setImputs={setImputs}
                  inputs={inputs}
                  name="colorCabello" />
            </div>
          </div>

          <div className="row justify-content-center mb-1">
            <div className="col-12 col-sm-6">
              <div className="App-Question text-left">Color de ojos</div>
            </div>
          </div>
          <div className="row justify-content-center mt-0">
            <div className="col-12 col-sm-6">
              <Selector
                  setImputs={setImputs}
                  inputs={inputs}
                  name="colorOjos" />
            </div>
          </div>

          <div className="row justify-content-md-center mt-0">
            <div className="col col-sm-6">
              <Link className="btn btn-primary btn-block btn-lg text-white text-decoration-none" href={Config.ConfigAppUrl+"Auth/EscortRegister7"} >
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
