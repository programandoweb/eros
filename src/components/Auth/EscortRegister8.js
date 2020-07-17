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
                          atiendoa:{
                            "Hombres":false,
                            "Mujeres":false,
                            "Parejas":false,
                          },
                          hobbies:{
                            "Bailar":false,
                            "Cine":false,
                            "Gimnasio":false,
                            "Viajar":false,
                            "Videojuegos":false,
                            "Futbol":false,
                            "Surf":false,
                            "Paracaidismo":false,
                            "Tatuajes":false,
                          }

                        }
const url_continue        =   Config.ConfigAppUrl+"Auth/EscortRegister9";

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

      Functions.PostAsync("User","setEscortRegisterHobbies",{data:JSON.stringify(inputs),token:user.token,breast_size:inputs.breast_size},context,{name:"callbackContinue",funct:callbackContinue})
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
      if (escort.json_hobbies!==undefined && escort.json_hobbies!==null && escort.json_hobbies!=="null" && escort.json_hobbies!=="") {
        let json_hobbies     =   JSON.parse(escort.json_hobbies)
        let __inputs          =   inputs
        Object.entries(json_hobbies.hobbies).map((v)=>{
          if (    v[1]   ) {
            __inputs.hobbies[v[0]]   =  true
          }else {
            __inputs.hobbies[v[0]]   =  false
          }
        })
        Object.entries(json_hobbies.atiendoa).map((v)=>{
          if (    v[1]   ) {
            __inputs.atiendoa[v[0]]   =  true
          }else {
            __inputs.atiendoa[v[0]]   =  false
          }
        })
        setInputs(__inputs)
      }
    },[])


  return (
    <div className="App-LogoCenter App-splash" style={divBackground}>
      <form className="App-form App-form-register">
        <div className="container">
          <div className="row justify-content-center mb-1">
            <div className="col-12 col-sm-4 ">
              <div className="App-Question--x2 text-left">Hobbies & Gustos</div>
            </div>
          </div>

            <ItemsDinamics
              name="hobbies"
              inputs={inputs2}
              setInputs={setInputs}
              title="Agregar más hobbies"
              boolTitle={false}
              itemsDefault={inputsDefault.hobbies}/>

          <div className="row justify-content-center mb-1">
            <div className="col-12 col-sm-4">
              <div className="App-Question--x2 text-left">Atiendo a:</div>
              <div className="text-gray text-decoration-none h6" >
                Selecciona el tipo de cliente al que ofreces tus servicios.
              </div>
            </div>
          </div>

          <ItemsDinamics
            name="atiendoa"
            inputs={inputs2}
            setInputs={setInputs}
            title="Agregar más hobbies"
            boolTitle={false}
            boolNew={false}
            itemsDefault={inputsDefault.atiendoa}/>


          <div className="row justify-content-md-center mt-0">
            <div className="col col-sm-4">
            <Link onClick={handleClick} className="btn btn-primary btn-block btn-lg text-white text-decoration-none" href={Config.ConfigAppUrl+"Auth/EscortRegister9"} >
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
