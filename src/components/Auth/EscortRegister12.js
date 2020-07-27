import React,{ useState,useContext,useEffect } from 'react';
import '../../App.css';
import background from '../../assets/images/design/background.jpg';
import edad from '../../assets/images/resources/ageicon.png';
import altura from '../../assets/images/resources/icon-height.png';
import Config from "../../helpers/config";
import StateContext from '../../helpers/contextState';
import Selector from "../Selector";
import store from "../../helpers/store";
import Link from '@material-ui/core/Link';
import ItemsDinamics from "../../screens/ItemsDinamics";
import Functions from "../../helpers/functions";



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
                          estatura:'',
                          edad:'',
                        }


let url_continue        =   Config.ConfigAppUrl+"Auth/EscortRegister13";

let user  = store.get("user");
let escort= store.get("escort");

function App() {

  const context               =   React.useContext(StateContext);
  const [inputs, setImputs]   =   useState(inputsDefault);
  const [inputs2, setInputs]  =   useState(inputsDefault);
  const state = useContext(StateContext);

  function handleClick(e){
    e.preventDefault();
    inputs.token  = user.token;

    let _inputs       =   inputs
        _inputs.data  =   JSON.stringify(store.get("escort"))
        _inputs.token =   user.token
    inputs.user_id  =   store.get("user").user_id;
    Functions.PostAsync("User","setEscortRegisterAsiSoy",{data:JSON.stringify(inputs),token:user.token,breast_size:inputs.breast_size},context,{name:"callbackContinue",funct:callbackContinue})
  }

  function callbackContinue(data){
    let insert  = store.get("escort");
        Object.entries(inputs).map((v)=>{
          insert[v[0]]=v[1]
        })
    store.set("escort",insert);
    document.location.href  = url_continue;
  }

  function handleChange(e){
    let _inputs = inputs
        _inputs[e.target.name] =  e.target.value;
    setInputs(_inputs)
    store.set("escort",{...escort,[e.target.name]:e.target.value})

  }


  useEffect(()=>{
    let __inputs    = inputs
    Object.entries(inputs).map((v,k)=>{
      if(escort[v[0]]!==undefined && (v[0]==='estatura' || v[0]==='edad')) {
        __inputs[v[0]]  = escort[v[0]];
      }else if(escort[v[0]]!==undefined && (v[0]==='micuerpo' || v[0]==='piel')){
        if (escort[v[0]]!==undefined && escort[v[0]].items!==undefined) {
          __inputs[v[0]]  = escort[v[0]];
        }else {
          __inputs[v[0]]  = JSON.parse(escort[v[0]]);
        }
      }else {
        __inputs[v[0]]  = inputsDefault[v[0]];
      }
    })
    setInputs(__inputs)
  },[])

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
                <input type="text" name="edad" defaultValue={inputs.edad} onChange={handleChange} className="form-control" placeholder="Edad"/>
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
                <input type="text" name="estatura" defaultValue={inputs.estatura} onChange={handleChange} className="form-control" placeholder="Estatura"/>
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
            <Link onClick={handleClick} className="btn btn-primary btn-block btn-lg text-white text-decoration-none" href={Config.ConfigAppUrl+"Auth/EscortRegister13"} >
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
