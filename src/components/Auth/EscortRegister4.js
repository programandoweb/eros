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

let user      = store.get("user");
let escort    = store.get("escort");
let base_url  = store.get("base_url");

function App() {

  const [inputs, setInputs] = useState({
                                          photo_cc_frontal:"",
                                          photo_cc_back:"",
                                          typeDocument:"",
                                          accept:"",
                                        });

  const context             =   React.useContext(StateContext);

  const url_continue        =   Config.ConfigAppUrl+"Auth/EscortRegister5";

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

      /*PUSH DATA STORE*/
      let Escort           =   store.get("escort");
      Object.entries(inputs).map((v,k)=>{
        if (Escort[v[0]]===undefined ) {
          Escort[v[0]]   =   "";
        }
        Escort[v[0]]     =   v[1] ;
      })
      store.set("escort",Escort);
      /*END PUSH DATA STORE*/

      delete Escort.photo_cc_back;
      delete Escort.photo_cc_frontal;

      //return console.log(Escort);

      Functions.PostAsync("User","setEscortRegister",Escort,context,{name:"callbackContinue",funct:callbackContinue})
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
      if(escort[v[0]]!==undefined && escort[v[0]]!==null && escort[v[0]]!=="null" && escort[v[0]]!=="") {
        __inputs[v[0]]  =  base_url+escort[v[0]];        
      }
    })


    setInputs(__inputs)

  },[])

  return (
    <div className="App-LogoCenter App-splash" style={divBackground}>
      <form className="App-form App-form-register">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-6 col-sm-3 text-center mt-4">
              <img className="img-fluid" src={logo} alt="ErosApp"/>
            </div>
          </div>
          <div className="row justify-content-center">
            <div className="col-12 col-sm-6 text-center">
              <div className="App-Question text-center">Validación de identidad</div>
            </div>
          </div>
          <div className="row justify-content-center mt-2">
            <div className="col-12 col-sm-6 text-center">
              <div className="text-fucsia h6">
                ¡Tranquil@, tu información es confidencial!
                <br/>
                Sólo queremos comprobar que eres mayor de edad.
              </div>
            </div>
          </div>
          <div className="row justify-content-center mt-2 mb-4">
            <div className="col-12 col-sm-6 text-center">
              <div className="App-Question--x2 text-center">Adjunta tu documento de identidad</div>
            </div>
          </div>
          <div className="row justify-content-center mt-3">
            <div className="col-12 col-sm-4 text-center">
              <div className="input-group mb-3">
                  <select className="form-control" name="type_identity_document" onChange={handleChange} defaultValue={escort.type_identity_document}>
                    <option>Seleccione el tipo de documento</option>
                    <option value="Cédula de ciudadanía">Cédula de ciudadanía</option>
                    <option value="Cédula de extrajería">Cédula de Extrajería</option>
                    <option value="pasaporte">Pasaporte</option>
                    <option value="pep">PEP</option>
                </select>
              </div>
            </div>
          </div>
          <div className="row justify-content-center">
            <div className="col-6 col-sm-2 mb-4">
              <div className="btn btn-secondary text-white p-0 position-relative upload">
                <input accept="image/*" doc="photo_cc_frontal" onChange={handleUpload} type="file" name="userfile"/>
                <img className="img-fluid" src={(inputs.photo_cc_frontal!=='')?inputs.photo_cc_frontal:photo_cc_frontalDefault} alt="front"/>
              </div>
            </div>
            <div className="col-6 col-sm-2 mb-4">
              <div className="btn btn-secondary text-white p-0 position-relative upload">
                <input accept="image/*" doc="photo_cc_back" onChange={handleUpload} type="file" name="userfile"/>
                <img className="img-fluid"  src={(inputs.photo_cc_back!=='')?inputs.photo_cc_back:photo_cc_backDefault}  alt="back"/>
              </div>
            </div>
          </div>
          <div className="row justify-content-md-center mt-1">
            <div className="col-12 col-sm-4 text-centerr">
              <Link onClick={handleClick} className="btn btn-primary btn-block btn-lg text-white text-decoration-none" href={Config.ConfigAppUrl+"Auth/EscortRegister5"} >
                Finalizar
              </Link>
            </div>
          </div>
          <div className="row justify-content-md-center mt-1">
            <div className="col-12 col-sm-4 text-center mb-4">
              <div className="custom-control custom-checkbox">
                <input type="checkbox" className="custom-control-input checkbox" id="defaultUnchecked"/>
                <label className="custom-control-label" htmlFor="defaultUnchecked">
                  <span className="text-gray terminos text-center ">Declaro que soy mayor de edad y acepto los
                    <Link  className=" p-0 m-0" href={Config.ConfigAppUrl+"Auth/Terminos_y_Condiciones"} > términos y condiciones</Link>
                  </span>
                </label>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default App;
