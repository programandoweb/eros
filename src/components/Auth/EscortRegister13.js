import React,{ useState,useContext } from 'react';
import '../../App.css';
import background from '../../assets/images/design/background.jpg';
import Config from "../../helpers/config";
import StateContext from '../../helpers/contextState';
import Selector from "../Selector";

const divBackground = {
  backgroundImage: 'url(' + background + ')',
};

const  inputsDefault  = {
                          estilo_cabello:{
                            items:["Largo","Corto"],
                            selection:"Largo",
                          },
                          color_cabello:{
                            items:["Negro","Castaño","Rubio","Rojizo"],
                            selection:"Negro",
                          },
                          color_ojos:{
                            items:["Café","Negro","Azul","Verde"],
                            selection:"Café",
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


          <div className="row justify-content-md-center mt-4">
            <div className="col-12 col-sm-4">
              <div className="App-Question--x2 text-left">Estilo de cabello</div>
            </div>
          </div>
          <div className="row justify-content-md-center mt-0">
            <div className="col-12 col-sm-4">
              <Selector
                  setImputs={setImputs}
                  inputs={inputs}
                  name="estilo_cabello" />
            </div>
          </div>
          <div className="row justify-content-md-center mt-0">
            <div className="col-12 col-sm-4">
              <div className="App-Question--x2 text-left">Color de cabello</div>
            </div>
          </div>
          <div className="row justify-content-center mt-0">
            <div className="col-12 col-sm-4">
              <Selector
                  setImputs={setImputs}
                  inputs={inputs}
                  name="color_cabello" />
            </div>
          </div>

          <div className="row justify-content-md-center mt-0">
            <div className="col-12 col-sm-4">
              <div className="App-Question--x2 text-left">Color de ojos</div>
            </div>
          </div>
          <div className="row justify-content-md-center mt-0">
            <div className="col-12 col-sm-4">
              <Selector
                  setImputs={setImputs}
                  inputs={inputs}
                  name="color_ojos" />
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
