import React,{ useState,useContext,useEffect } from 'react';
import '../../App.css';
import background from '../../assets/images/design/background.jpg';
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

const url_continue        =   Config.ConfigAppUrl+"Auth/EscortRegister14";

let user  = store.get("user");
let escort= store.get("escort");


function App() {

  const context             =   React.useContext(StateContext);
  const [inputs, setImputs] = useState(inputsDefault);
  const [inputs2, setInputs] =   useState(inputsDefault);
  const state = useContext(StateContext);


  function handleClick(e){
    e.preventDefault();
    inputs.token  = user.token;

    /*PUSH DATA STORE*/
    let Escort           =   store.get("escort");
    Object.entries(inputs).map((v,k)=>{
      if (Escort[v[0]]===undefined ) {
        Escort[v[0]]    =   "";
      }
      Escort[v[0]]      =   v[1] ;
    })

    store.set("escort",Escort);
    /*END PUSH DATA STORE*/

    Functions.PostAsync("User","setEscortRegisterEstilo",{data:JSON.stringify(inputs),token:user.token,breast_size:inputs.breast_size},context,{name:"callbackContinue",funct:callbackContinue})
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
      if(escort[v[0]]!==undefined){
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
            <Link onClick={handleClick} className="btn btn-primary btn-block btn-lg text-white text-decoration-none" href={Config.ConfigAppUrl+"Auth/EscortRegister14"} >
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
