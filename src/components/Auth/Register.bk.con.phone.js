import React, {useState} from 'react';
import '../../App.css';
import logo from '../../assets/images/resources/erosapp-user-check.png';
import background from '../../assets/images/resources/bg.png';
import Link from '@material-ui/core/Link';
import Config from "../../helpers/config";
import Functions from "../../helpers/functions";
import StateContext from '../../helpers/contextState'
import firebase from '../Firebase'


const divBackground = {
  backgroundImage: 'url(' + background + ')',
};

function App() {

  const [inputs, setInputs] = useState({
                                          email:"lic.jorgemendez@gmail.com",
                                          phone:"+573115000926",
                                        });

  const context             =   React.useContext(StateContext);

  function onSignInSubmit(){


  }

  function handleClick(){

    firebase.auth().languageCode = 'es';

    window.recaptchaVerifier  =   new firebase.auth.RecaptchaVerifier('sign-in-button',{
      'size': 'invisible',
    });
    var appVerifier           =   window.recaptchaVerifier;
    firebase.auth().signInWithPhoneNumber(inputs.phone, appVerifier)
      .then(function (confirmationResult) {
        window.confirmationResult = confirmationResult
    }).catch(function (error) {
      
    });





    // window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('sign-in-button', {
    //   'size': 'invisible',
    //   'callback': function(response) {
    //     console.log(response,"response recaptchaVerifier");
    //     // reCAPTCHA solved, allow signInWithPhoneNumber.
    //     onSignInSubmit();
    //     var phoneNumber = inputs.phone;
    //     var appVerifier = window.recaptchaVerifier;
    //     firebase.auth().signInWithPhoneNumber(phoneNumber, appVerifier)
    //       .then(function (confirmationResult) {
    //         console.log(confirmationResult);
    //         //window.confirmationResult = confirmationResult;
    //       }).catch(function (error) {
    //         console.log(error);
    //       });
    //   }
    // });




    // firebase.auth().createUserWithEmailAndPassword({
    //   email: inputs.email,
    //   emailVerified: false,
    //   phoneNumber: inputs.phone,
    //   password: 'secretPassword',
    //   displayName: 'Nuevo Usuario '+inputs.email,
    //   photoURL: 'https://panel.mundosostenible.co/images/icon.png',
    //     disabled: false
    //   })
    // .then(function(userRecord) {
    //     console.log('Successfully created new user:', userRecord.uid);
    // })
    // .catch(function(error) {
    //   console.log('Error creating new user:', error);
    // });



    // firebase.auth().createUserWithEmailAndPassword(inputs.email, "123456").catch(function(error) {
    //   var errorCode = error.code;
    //   var errorMessage = error.message;
    // });

    //Functions.PostAsync
    //Functions.PostAsync("User","register",inputs,context)
    //console.log(Functions.PostAsync,context);
  }

  function KeyUp(e) {
    let name          =   e.target.name;
    let _inputs       =   inputs;
        _inputs[name] =   e.target.value;
        setInputs(_inputs)
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
                <input defaultValue={inputs.email} onKeyUp={KeyUp} type="text" name="email" className="form-control" placeholder="Correo electrónico" required/>
              </div>
              <div className="input-group mb-3">
                <div className="input-group-prepend">
                  <span className="input-group-text">
                    <i className="fas fa-phone-alt"></i>
                  </span>
                </div>
                <input defaultValue={inputs.phone} onKeyUp={KeyUp} type="text" name="phone" className="form-control" placeholder="Número telefónico Ej: +573115000000" required/>
              </div>
            </div>
          </div>
          <div id="sign-in-button"></div>
          <div className="row justify-content-md-center mt-1">
            <div className="col col-sm-6">
              <div onClick={handleClick} className="btn btn-primary btn-block btn-lg text-white text-decoration-none" href={Config.ConfigAppUrl+"Auth/Register4"} >
                Continuar
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
