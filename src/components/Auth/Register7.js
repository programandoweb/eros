import React,{ useContext  } from 'react';
import '../../App.css';
import logo from '../../assets/images/design/logo-vertical.png';
import cc from '../../assets/images/design/image-cc-default.jpg';
import cc2 from '../../assets/images/design/image-cc2-default.jpg';
import background from '../../assets/images/design/background.jpg';
import StateContext from '../../helpers/contextState';



const divBackground = {
  backgroundImage: 'url(' + background + ')',
};

function App() {

  const state = useContext(StateContext);


  function handlerFinish(){
    let modal = {
                  status:true,
                  title:"Registrado con éxito",
                  message:"ya puedes usar tu cuenta",
                  customButtom:{

                  },
                  ico:{
                        contentColor:"modal-ico-bg-green",
                        ico:'fas fa-check',
                      },
                }
    state.setState({dialog:modal})
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
              <div className="App-Question text-center">Validación de datos</div>
            </div>
          </div>
          <div className="row justify-content-center mt-3">
            <div className="col-12 col-sm-6 text-center">
              <div className="text-white text-decoration-none h6">
                ¡Tranquil@, tu información es confidencial!
                <br/>
                Sólo queremos comprobar que eres mayor de edad.
              </div>
            </div>
          </div>
          <div className="row justify-content-center mb-4">
            <div className="col-12 col-sm-6 text-center">
              <div className="App-Question text-center">Adjunta tu documento de identidad</div>
            </div>
          </div>
          <div className="row justify-content-center mt-3">
            <div className="col-12 col-sm-4 text-center">
              <div className="input-group mb-3">
                <select className="form-control">
                  <option>Seleccione el tipo de documento</option>
                  <option value="Cédula de ciudadanía">Cédula de ciudadanía</option>
                  <option value="Cédula de extrajería">Cédula de Extrajería</option>
                  <option value="pasaporte">Pasaporte</option>
                </select>
              </div>
            </div>
          </div>
          <div className="row justify-content-center text-center">
            <div className="col-4 col-sm-2 mb-3 ">
              <div>
                <div className="btn btn-secondary btn-sq text-white p-0">
                  <img className="img-fluid" src={cc} alt="Documento Frontal"/>
                </div>
                Fontal
              </div>
            </div>
            <div className="col-4 col-sm-2">
              <div>
                <div className="btn btn-secondary btn-sq text-white p-0">
                  <img className="img-fluid" src={cc2} alt="Documento Posterior"/>
                </div>
                Trasera
              </div>
            </div>
          </div>
          <div className="row justify-content-md-center">
            <div className="col col-sm-6">
              <div onClick={handlerFinish} className="btn btn-primary btn-block text-white text-decoration-none">
                Finalizar
              </div>
            </div>
          </div>
          <div className="row justify-content-center mt-3">
            <div className="col-12 col-sm-6 text-center">
              <div className="text-white text-decoration-none h6">
                Declaro que soy mayor de edad y acepto los <div href="#" className="realtantes">términos y condiciones</div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default App;
