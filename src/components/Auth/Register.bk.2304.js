import React, {useState,useEffect} from 'react';
import '../../App.css';
import logo from '../../assets/images/resources/erosapp-user-check.png';
import background from '../../assets/images/resources/bg.png';
import Link from '@material-ui/core/Link';
import Config from "../../helpers/config";
import Functions from "../../helpers/functions";
import store from "../../helpers/store";
import StateContext from '../../helpers/contextState'
import firebase from '../Firebase'


const divBackground = {
  backgroundImage: 'url(' + background + ')',
};

const timeDefault   = 40;

let user = store.get("user");
let modal = {
              status:false,
              title:"",
              message:"",
              ico:{
                    contentColor:"modal-ico-bg-primary",
                    ico:'fas fa-check',
                  },
            }

function App() {
  /*
    inputVerify: toggle dei input code
    clock: es el cronómetro al finalizar pregunta si desea volver a enviar clave
    prevNowPlaying: es el setTime del cronómetro
    phoneCode: guarda los datos luego del registro
    continueRegistration: activa botón para continuar
  */
  const [inputVerify, setVerify]  =   useState(false)
  let   [clock, setClock]         =   useState(timeDefault);
  let   prevNowPlaying            =   false;
  let   [phoneCode, setphoneCode] =   useState(false);
  let   [confirmationResult, setConfirmationResult] =   useState(false);
  let   [continueRegistration, setContinueRegistration] =   useState(false);
  let   checkStorage              =   false;


  const [inputs, setInputs] = useState({
                                          email:"",
                                          phone:"",
                                          cod_country:"",
                                        });



  const context             =   React.useContext(StateContext);

  /*Intento registrar el usuario, la respuesta la procesa "sendCode"*/
  function handleClick(){
    if (!chekingInputs()){ return false;}
    if (clock < timeDefault) {
      console.log(confirmationResult);
      if (inputs.codeVerify!==''  && confirmationResult) {
        confirmationResult.confirm(inputs.codeVerify).then(function (result) {
          phoneCode.token_old   =   phoneCode.response.token;
          phoneCode.token       =   result.user.uid;
          phoneCode.email_verified_at = true;
          phoneCode.updated_at = true;
          store.set("user",phoneCode);
          Functions.PostAsync("User","setUser",phoneCode,context,{name:"callbackContinueRegistration",funct:callbackContinueRegistration})
        }).catch(function (error) {
          /*SET MODAL*/
          let input = inputs;
          input.codeVerify='';
          modal = {
                        status:true,
                        title:"Error en verificación",
                        message:"El código no coincide, verifique su SMS y reintente",
                        ico:{
                              contentColor:"modal-ico-bg-primary",
                              ico:'fas fa-check',
                            },
                      }
          context.setState({dialog:modal})
        });
      }
      return false;
    }
    if (!phoneCode) {
      Functions.PostAsync("User","register",inputs,context,{name:"callback",funct:sendCode})
    }else{
      setClock(timeDefault)
      handleInitClock();
      sendCode({data:{code:200}})
    }
  }

  /* gestor del cronómetro*/
  function handleInitClock(){
    if (phoneCode) {
      setClock(timeDefault)
    }
    if (chekingInputs() && !prevNowPlaying) {
      prevNowPlaying = setInterval(function () {
        setClock(clock--);
        if (clock < 0) {
          setClock(timeDefault);
          clearInterval(prevNowPlaying);
          prevNowPlaying=false;
        }
      }, 1000);
    }
  }

  function chekingInputs(){
    if(!phoneCode && inputs.email==='' && inputs.phone==='' && !checkStorage){
      modal = {
                status:true,
                title:"Campos incompletos",
                message:"Para completar el proceso de registro debes sumistrar el correo electrónico y celular",
                ico:{
                      contentColor:"modal-ico-bg-primary",
                      ico:'fas fa-exclamation pl-3',
                    },
              }
      context.setState({dialog:modal})
      return false;
    }else{
      return true;
    }
  }

  /*solicitar código y nuevo código*/
  function sendCode(data){
    if (!chekingInputs()){ return false;}

    if (phoneCode) {
      data=phoneCode
    }

    if (data.response.callback==='Continue') {
      return setContinueRegistration(true);
    }

    if (data.code===200) {

      setphoneCode(data);
      handleInitClock();
      setVerify(true);
      var testVerificationCode = "123456";

      firebase.auth().settings.appVerificationDisabledForTesting = true;

      firebase.auth().languageCode = 'es';

      window.recaptchaVerifier  =   new firebase.auth.RecaptchaVerifier('sign-in-button',{
        'size': 'invisible',
      });

      var appVerifier           =   window.recaptchaVerifier;
      
      let _phone  = (inputs.phone!==undefined && inputs.phone!=='')?inputs.cod_country + inputs.phone:user.phone;

      if (_phone!=='') {
        firebase.auth().signInWithPhoneNumber(_phone, appVerifier)
          .then(function (confirmationResult) {

            setConfirmationResult(confirmationResult);
        }).catch(function (error) {
            console.log(_phone,error,'Error');
        });
      }
    }

  }

  /*Set Inputs Var en el state*/
  function KeyUp(e) {
    let name          =   e.target.name;
    let _inputs       =   inputs;
        _inputs[name] =   e.target.value;
        setInputs(_inputs)
  }

  /*Continuar con el registro*/
  function callbackContinueRegistration(data){
    setVerify(false);
    setContinueRegistration(true);
    store.set("user",data.response.user);
    document.location.href=Config.ConfigAppUrl+"Auth/Login"
  }

  useEffect(()=>{
    checkUserInStorage()
    setInputs({cod_country:store.get("geoip").cod_phone})
  },[])

  /*verificación de usuario en el storage*/
  function checkUserInStorage(){
    if (user.token!==undefined) {
      // setContinueRegistration(true)
      checkStorage=true;
      setInputs({
                  email:user.email,
                  phone:user.phone,
                })
      Functions.PostAsync("User","checkUser",{email:user.email,phone:user.phone,},context,{name:"callbackContinueRegistration",funct:sendCode})
    }
  }

  function handleClickClearStore(){
    store.clear();
    window.location.reload();
  }


  return (
    <div className="App-LogoCenter App-splash" style={divBackground}>
      <div className="App-form App-form-register">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-6 col-sm-4 text-center">
              <img className="img-fluid" src={logo} alt="ErosApp"/>
            </div>
          </div>
          <div className="row justify-content-center mt-4 mb-4">
            <div className="col-12 col-sm-6 text-center">
              <div className="App-Question text-center">Datos de validación</div>
            </div>
          </div>
          <div className="row justify-content-center mt-3">
            <div className="col-12 col-sm-4 text-center">
              <div className="input-group mb-3">
                <div className="input-group-prepend">
                  <span className="input-group-text">
                    <i className="fas fa-envelope"></i>
                  </span>
                </div>
                <input defaultValue={inputs.email} onChange={KeyUp} onKeyUp={KeyUp} type="text" name="email" className="form-control" placeholder="Correo electrónico" required/>
              </div>
              <div className="input-group mb-3">
                <div className="input-group-prepend">
                  <span className="input-group-text">
                    <i className="fas fa-phone-alt mr-2"></i>
                    {inputs.cod_country}
                  </span>
                </div>
                <input  maxLength="10" defaultValue={inputs.phone}  onChange={KeyUp}  onKeyUp={KeyUp} type="text" name="phone" className="form-control" placeholder="Ej:3115000000" required/>
              </div>
              <div  className={(inputVerify)?"input-group mb-3":"input-group mb-3 d-none"}>
                <div className="input-group-prepend">
                  <span className="input-group-text">
                    <i className="fas fa-keyboard"></i>
                  </span>
                </div>
                <input  maxLength="6" type="numeric"  onChange={KeyUp}  onKeyUp={KeyUp} name="codeVerify" className="form-control" placeholder="******" required/>
              </div>
            </div>
          </div>
          <div id="sign-in-button"></div>
          <div className="row justify-content-md-center mt-1">
            <div className="col col-sm-6">
              {(!continueRegistration)?<div onClick={handleClick} className="btn btn-primary btn-block btn-lg text-white text-decoration-none" href={Config.ConfigAppUrl+"Auth/Register4"} >
                                          {(clock>0)? (clock<timeDefault)?'Enviar código recibido':'Continuar' :'Reenviar código de verificación'} {(clock<timeDefault)?" ("+ clock +") ":""}
                                        </div> :<Link className="btn btn-primary btn-block btn-lg text-white text-decoration-none" href={Config.ConfigAppUrl+"Auth/Register1"} >
                                                  Continuar Registro
                                                </Link>

              }
            </div>
          </div>
          {(store.get("user").user_id!=undefined)?<div className="row justify-content-md-center mt-1">
                                                    <div className="col col-sm-6 btn btn-link text-center text-subtitulos" onClick={handleClickClearStore}>
                                                      ¡No son tus datos!
                                                    </div>
                                                  </div>:''
          }
        </div>
      </div>
    </div>
  );
}

export default App;
