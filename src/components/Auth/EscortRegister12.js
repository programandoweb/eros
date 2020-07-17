import React,{ useState,useContext } from 'react';
import '../../App.css';
import background from '../../assets/images/design/background.jpg';
import edad from '../../assets/images/resources/ageicon.png';
import altura from '../../assets/images/resources/icon-height.png';
import Config from "../../helpers/config";
import StateContext from '../../helpers/contextState';
import Selector from "../Selector";


const divBackground = {
  backgroundImage: 'url(' + background + ')',
};

const  inputsDefault  = {
                          micuerpo:{
                            items:["Delgado","Normal","Fitness","Con cirugías"],
                            selection:"Delgado",
                          },
                          piel:{
                            items:["Claro","Mestizo","Oscuro"],
                            selection:"Claro",
                          },
                        }

function App() {

  const [btnSenos, setBtnSenos] = useState("No");
  const [btnCola, setBtnCola] = useState("No");
  const [btnLipoescultura, setBtnLipoescultura] = useState("No");
  const [btnBichectomia, setBtnBichectomia] = useState("No");

  const [inputs, setImputs] = useState(inputsDefault);

  const state = useContext(StateContext);


  function handlerFinish(){
    let modal = {
                  status:true,
                  title:"Registrado con éxito",
                  message:"ya puedes usar tu cuenta",
                  customButtom:{
                    link:Config.ConfigAppUrl+"Auth/EscortRegister8"
                  },
                  ico:{
                        contentColor:"modal-ico-bg-primary",
                        ico:'fas fa-check',
                      },
                }
    state.setState({dialog:modal})
  }

  return (
    <div className="App-LogoCenter App-splash" style={divBackground}>
      <form className="App-form App-form-register">
        <div className="container">


          <div className="row justify-content-center mb-1 mt-4">
            <div className="col-12 col-sm-4">
              <div className="App-Question--x2 text-left">Asi soy yo</div>
            </div>
          </div>
          <div className="row justify-content-md-center mt-0">
            <div className="col-12 col-sm-4">
              <div className="input-group mb-3">
                <div className="input-group-prepend">
                  <span className="input-group-text">
                    <img src={edad} alt="P" className="tamano-icono" />
                  </span>
                </div>
                <input type="text" name="edad" className="form-control" placeholder="Edad"/>
                <div className="input-group-append">
                  <span className="input-group-text">
                    <i className="fas fa-chevron-right"></i>
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="row justify-content-md-center mt-0">
            <div className="col-12 col-sm-4">
              <div className="input-group mb-3">
                <div className="input-group-prepend">
                  <span className="input-group-text">
                    <img src={altura} alt="P" className="tamano-icono" />
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


          <div className="row justify-content-md-center mt-0">
            <div className="col-12 col-sm-4">
              <div className="App-Question--x2 text-left">Mi cuerpo es:</div>
            </div>
          </div>
          <div className="row justify-content-md-center mt-0">
            <div className="col-12 col-sm-4">
              <Selector
                  setImputs={setImputs}
                  inputs={inputs}
                  name="micuerpo" />
            </div>
          </div>
          <div className="row justify-content-md-center mt-0">
            <div className="col-12 col-sm-4">
              <div className="App-Question--x2 text-left">Tono de piel</div>
            </div>
          </div>
          <div className="row justify-content-center mt-0">
            <div className="col-12 col-sm-4">
              <Selector
                  setImputs={setImputs}
                  inputs={inputs}
                  name="piel" />
            </div>
          </div>
          <div className="row justify-content-md-center mt-0 mb-4">
            <div className="col-12 col-sm-4">
              <div onClick={handlerFinish}  className="btn btn-primary btn-block btn-lg text-white text-decoration-none">
                Continuar
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default App;
