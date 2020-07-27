import React,{ useState,useContext,useEffect } from 'react';
import '../../App.css';
import background from '../../assets/images/design/background.jpg';
import Link from '@material-ui/core/Link';
import Config from "../../helpers/config";
import Selector from "../Selector";
import ItemsDinamics from "../../screens/ItemsDinamics";
import Functions from "../../helpers/functions";
import store from "../../helpers/store";
import StateContext from '../../helpers/contextState';

const divBackground = {
  backgroundImage: 'url(' + background + ')',
};

const  inputsDefault  = {
                          horario:{
                            items:["24 Horas","Personalizar Tiempo"],
                            selection:"24 Horas",
                          },

                          dias:{
                              "Lunes":false,
                              "Martes":false,
                              "Miercoles":false,
                              "Jueves":false,
                              "Viernes":false,
                              "Sabado":false,
                              "Domingo":false,
                          },

                          servicios:{
                            "Besos":false,
                            "Anal":false,
                            "Vaginal":false,
                            "Masaje":false,
                            "Con ducha":false,
                            "Oral":false,
                            "Facial":false,
                            "Orgias":false,
                            "Strap-on":false,
                          },
                        }

const url_continue        =   Config.ConfigAppUrl+"Auth/EscortRegister10";

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


    /*PUSH DATA STORE*/
    let Escort           =   store.get("escort");
    Object.entries(inputs).map((v,k)=>{
      if (Escort[v[0]]===undefined ) {
        Escort[v[0]]    =   "";
      }
      Escort[v[0]]      =   v[1] ;
    })

    store.set("escort",Escort);

    Functions.PostAsync("User","setEscortRegisterServicios",{data:JSON.stringify(inputs),token:user.token,breast_size:inputs.breast_size},context,{name:"callbackContinue",funct:callbackContinue})
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
    console.log(escort); return
    store.set("escort",{...escort,[e.target.name]:e.target.value})
  }


  useEffect(()=>{
    if (escort.json_servicios!==undefined && escort.json_servicios!==null && escort.json_servicios!=="" && escort.json_servicios!=="null") {
      let json_servicios     =   JSON.parse(escort.json_servicios)
      let __inputs      =   inputs
      Object.entries(json_servicios.dias).map((v)=>{
        if (    v[1]   ) {
          __inputs.dias[v[0]]   =  true
        }else {
          __inputs.dias[v[0]]   =  false
        }
      })
      Object.entries(json_servicios.servicios).map((v)=>{
        if (    v[1]   ) {
          __inputs.servicios[v[0]]   =  true
        }else {
          __inputs.servicios[v[0]]   =  false
        }
      })
      setInputs(__inputs)
    }



  },[])


  return (
    <div className="App-LogoCenter App-splash" style={divBackground}>
      <form className="App-form App-form-register">
        <div className="container">
          <div className="row justify-content-center mb-1 mt-4">
            <div className="col-12 col-sm-4">
              <div className="App-Question--x2 text-left">¿Qué días trabajas?</div>
            </div>
          </div>

          <ItemsDinamics
            name="dias"
            inputs={inputs2}
            setInputs={setInputs}
            boolTitle={false}
            boolNew={false}
            title="Agregar más dias"
            itemsDefault={inputsDefault.dias}/>

          <div className="row justify-content-md-center mt-0">
            <div className="col-12 col-sm-4">
              <div className="App-Question--x2 text-left">¿Qué horario dispones?</div>
            </div>
          </div>
          <div className="row justify-content-center mt-0">
            <div className="col-12 col-sm-4">
              <Selector
                  setImputs={setImputs}
                  inputs={inputs}
                  name="horario" />
            </div>
          </div>


          <div className="row justify-content-center mb-1">
            <div className="col-12 col-sm-4">
              <div className="App-Question--x2 text-left">¿Qué incluye tus servicios?</div>
            </div>
          </div>

          <ItemsDinamics
            name="servicios"
            inputs={inputs2}
            setInputs={setInputs}
            boolTitle={false}
            title="Agregar más servicios"
            itemsDefault={inputsDefault.servicios}/>



            <div className="row justify-content-md-center mt-0 mb-4">
              <div className="col-12 col-sm-4">
                <Link onClick={handleClick} className="btn btn-primary btn-block btn-lg text-white text-decoration-none" href={Config.ConfigAppUrl+"Auth/EscortRegister10"} >
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
