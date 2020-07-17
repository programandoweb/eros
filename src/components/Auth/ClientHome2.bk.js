import React,{useState,useEffect} from 'react';
import '../../App.css';
import logo from '../../assets/images/resources/icon-id.png';
import background from '../../assets/images/design/background.jpg';
import Link from '@material-ui/core/Link';
import Config from "../../helpers/config";
import Autocomplete from "../Autocomplete";
import StateContext from '../../helpers/contextState'
import Functions from "../../helpers/functions";
import store from "../../helpers/store";
import photo_cc_frontalDefault from '../../assets/images/design/image-cc-default.jpg';
import photo_cc_backDefault from '../../assets/images/design/image-cc2-default.jpg';

const divBackground = {
  backgroundImage: 'url(' + background + ')',
};

let user  = store.get("user");
let escort= store.get("escort");

function App() {

  const [inputs, setInputs] = useState({
                                          photo_cc_frontal:"",
                                          photo_cc_back:"",
                                          typeDocument:"",
                                          accept:"",
                                        });

  const context             =   React.useContext(StateContext);

  const url_continue        =   Config.ConfigAppUrl+"Auth/EscortRegister4";

  function callbackContinue(data){
    let insert  = store.get("escort");
        Object.entries(inputs).map((v)=>{
          insert[v[0]]=v[1]
        })
    store.set("escort",insert);
    let modal = {
              status:true,
              title:"¡Registro con éxito!",
              message:"¡ya puedes usar tu cuenta!",
              ico:{
                    contentColor:"modal-ico-bg-primary",
                    ico:'fas fa-check pl-1',
                  },
              customButtom:{
                link:Config.ConfigAppUrl+"Auth/EscortRegister5",
              }
            }
    context.setState({dialog:modal})
    //document.location.href  = url_continue;
  }

  function handleChange(e){
    store.set("escort",{...escort,[e.target.name]:e.target.value})

  }

  function handleClick(e){
    e.preventDefault();
    inputs.token  = user.token;
    if (inputs.ano!=='' && inputs.mes!=='' && inputs.dia!=='') {
      Functions.PostAsync("User","setEscortRegister",{token:user.token,birth_date:inputs.ano+'-'+inputs.mes+'-'+inputs.dia},context,{name:"callbackContinue",funct:callbackContinue})
    }else{

    }
  }

  function handleUpload(e){
    let renameFile  = e.target.attributes['doc'].value;
    Functions.PostAsync("User","uploadDocument",{renameFile:renameFile,token:user.token,userfile:e.target.files[0],type:e.target.attributes['doc'].value},context,{name:"callbackChangeImage",funct:callbackChangeImage})
    e.preventDefault();
  }

  function callbackChangeImage(data){
    Object.entries(data.response).map((v)=>{
      if (v[0]!=='error' && v[0]!=='callback') {
        setInputs({
          ...inputs,
          [v[0]]: v[1]
        });
        let push        = store.get("escort");
            push[v[0]]  = v[1]
        store.set("escort",push);
      }
    })
  }


  useEffect(()=>{
    let __inputs    = inputs
    Object.entries(inputs).map((v,k)=>{
      if(escort[v[0]]!==undefined) {
        __inputs[v[0]]  = escort[v[0]];
      }
    })
    setInputs(__inputs)

  },[])

  return (
    <div className="App-LogoCenter App-splash" style={divBackground}>
      <form className="App-form App-form-register">
        <div className="container">
          <div className="row justify-content-center">
          </div>

          <div className="row justify-content-center mt-2 mb-0">
            <div className="col-12 col-sm-4 text-left">
              <div className="App-Question--x2 text-left">Por servicio:</div>
            </div>
          </div>

          <div className="row justify-content-center mt-0">
            <div className="col-12 col-sm-4 text-center">
              <div className="input-group mb-3">
                  <select className="form-control" name="type_identity_document" onChange={handleChange} defaultValue={escort.type_identity_document}>
                    <option>Selecciona el servicio</option>
                    <option value="Cédula de ciudadanía">Prepago</option>
                    <option value="Cédula de extrajería">Escort</option>
                    <option value="Cédula de extrajería">Show Striptease</option>
                    <option value="Cédula de extrajería">Amanecida</option>
                    <option value="Cédula de extrajería">Videochat</option>
                </select>
              </div>
              <div className=" background-borde-bot"> </div>
            </div>
          </div>

          <div className="row justify-content-center mt-4 mb-0">
            <div className="col-12 col-sm-4 text-left">
              <div className="App-Question--x2 text-left">Por servicio:</div>
            </div>
          </div>

          <div className="row justify-content-center mt-0">
            <div className="col-12 col-sm-4 text-center">
              <div className="input-group mb-3">
                  <select className="form-control" name="type_identity_document" onChange={handleChange} defaultValue={escort.type_identity_document}>
                    <option>$100.000-$200.000</option>
                    <option value="Cédula de ciudadanía">$150.000</option>
                    <option value="Cédula de extrajería">$160.000</option>
                    <option value="Cédula de extrajería">$180.000</option>
                    <option value="Cédula de extrajería">$190.000</option>
                    <option value="Cédula de extrajería">$200.000</option>
                </select>
              </div>
              <div className=" background-borde-bot"> </div>
            </div>
          </div>

          <div className="row justify-content-center mt-4 mb-0">
            <div className="col-12 col-sm-4 text-left">
              <div className="App-Question--x2 text-left">Busqueda avanzada</div>
            </div>
          </div>

          <div className="row justify-content-center mt-4 mb-0">
            <div className="col-6 col-sm-4 text-left">
              <div className="App-Question--x2 text-left">Edad:</div>
            </div>
          </div>

          <div className="row justify-content-center mt-0">
            <div className="col-6 col-sm-4 text-center">
              <div className="input-group mb-3">
                  <select className="form-control " name="type_identity_document" onChange={handleChange} defaultValue={escort.type_identity_document}>
                    <option>18-25</option>
                    <option value="Cédula de ciudadanía">18</option>
                    <option value="Cédula de extrajería">19</option>
                    <option value="Cédula de extrajería">20</option>
                    <option value="Cédula de extrajería">21</option>
                    <option value="Cédula de extrajería">22</option>
                    <option value="Cédula de extrajería">23</option>
                    <option value="Cédula de extrajería">24</option>
                    <option value="Cédula de extrajería">25</option>
                  </select>
              </div>
              <div className=" background-borde-bot"> </div>
            </div>
          </div>

          <div className="row justify-content-center mt-4 mb-0">
            <div className="col-6 col-sm-4 text-left">
              <div className="App-Question--x2 text-left">Nacionalidad:</div>
            </div>
          </div>

          <div className="row justify-content-center mt-0">
            <div className="col-6 col-sm-4 text-center">
              <div className="input-group mb-3">

                  <select className="form-control " name="type_identity_document" onChange={handleChange} defaultValue={escort.type_identity_document}>
                    <option>Venezuela</option>
                    <option value="Cédula de ciudadanía">Colombia</option>
                    <option value="Cédula de extrajería">Chile</option>
                    <option value="Cédula de extrajería">Peru</option>
                  </select>
              </div>
              <div className=" background-borde-bot"> </div>
            </div>
          </div>

          <div className="row justify-content-center mt-4 mb-0">
            <div className="col-12 col-sm-4 text-left">
              <div className="App-Question--x2 text-left">Género:</div>
            </div>
          </div>

          <div className="row justify-content-center mt-0">
            <div className="col-12 col-sm-4 text-center">
              <div className="input-group mb-3">

                  <select className="form-control " name="type_identity_document" onChange={handleChange} defaultValue={escort.type_identity_document}>
                    <option>Mujer</option>
                    <option value="Cédula de ciudadanía">Hombre</option>
                  </select>
              </div>
              <div className=" background-borde-bot"> </div>
            </div>
          </div>

          <div className="row justify-content-center mt-4 mb-0">
            <div className="col-12 col-sm-4 text-left">
              <div className="App-Question--x2 text-left">Contextura:</div>
            </div>
          </div>

          <div className="row justify-content-center mt-0">
            <div className="col-12 col-sm-4 text-center">
              <div className="input-group mb-3">

                  <select className="form-control " name="type_identity_document" onChange={handleChange} defaultValue={escort.type_identity_document}>
                    <option>Delgado</option>
                    <option value="Cédula de extrajería">Robusto</option>
                  </select>
              </div>
              <div className=" background-borde-bot"> </div>
            </div>
          </div>

          <div className="row justify-content-center mt-4 mb-0">
            <div className="col-12 col-sm-4 text-left">
              <div className="App-Question--x2 text-left">Tono de piel:</div>
            </div>
          </div>

          <div className="row justify-content-center mt-0">
            <div className="col-12 col-sm-4 text-center">
              <div className="input-group mb-3">

                  <select className="form-control " name="type_identity_document" onChange={handleChange} defaultValue={escort.type_identity_document}>
                    <option>Mestizo</option>
                    <option value="Cédula de extrajería">Blando</option>
                  </select>
              </div>
              <div className=" background-borde-bot"> </div>
            </div>
          </div>

          <div className="row justify-content-center mt-4 mb-0">
            <div className="col-12 col-sm-4 text-left">
              <div className="App-Question--x2 text-left">Cabello:</div>
            </div>
          </div>

          <div className="row justify-content-center mt-0">
            <div className="col-12 col-sm-4 text-center">
              <div className="input-group mb-3">

                  <select className="form-control " name="type_identity_document" onChange={handleChange} defaultValue={escort.type_identity_document}>
                    <option>Corto</option>
                    <option value="Cédula de extrajería">Largo</option>
                    <option value="Cédula de extrajería">Hondulado</option>
                    <option value="Cédula de extrajería">Lacio</option>
                  </select>
              </div>
              <div className=" background-borde-bot"> </div>
            </div>
          </div>


        </div>
      </form>
    </div>
  );
}

export default App;
