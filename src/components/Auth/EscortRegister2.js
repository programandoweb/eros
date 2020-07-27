import React,{useState,useEffect} from 'react';
import '../../App.css';
import logo from '../../assets/images/resources/icono-world.png';
import background from '../../assets/images/design/background.jpg';
import Link from '@material-ui/core/Link';
import Config from "../../helpers/config";
import Autocomplete from "../Autocomplete";
import StateContext from '../../helpers/contextState'
import Functions from "../../helpers/functions";
import store from "../../helpers/store";


const divBackground = {
  backgroundImage: 'url(' + background + ')',
};

let user  = store.get("user");
let escort= store.get("escort");

function App() {

  const [inputs, setInputs] = useState({
                                          country:"",
                                          city:"",
                                        });

  const context             =   React.useContext(StateContext);

  const url_continue        =   Config.ConfigAppUrl+"Auth/EscortRegister3";

  // function KeyUp(e) {
  //   let name          =   e.target.name;
  //   let _inputs       =   inputs;
  //       _inputs[name] =   e.target.value;
  //       setInputs(_inputs)
  // }

  function callbackContinue(data){
    let insert  = store.get("escort");
        Object.entries(inputs).map((v)=>{
          insert[v[0]]=v[1]
        })
    store.set("escort",insert);
    document.location.href  = url_continue;
  }

  function handleClick(e){
    e.preventDefault();
    inputs.token  = user.token;
    if (inputs.country!=='' && inputs.city!=='') {

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


      Functions.PostAsync("User","setEscortRegister",inputs,context,{name:"callbackContinue",funct:callbackContinue})
    }else{

    }
  }

  async function asyncState() {

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
            <div className="col-6 col-sm-3 text-center">
              <img className="img-fluid" src={logo} alt="ErosApp"/>
            </div>
          </div>
          <div className="row justify-content-center mt-4 mb-4">
            <div className="col-12 col-sm-6 text-center">
              <div className="App-Question text-center">¿Dónde estás?</div>
            </div>
          </div>
          <div className="row justify-content-center mt-3">
            <Autocomplete inputs={inputs} setInputs={setInputs}/>
          </div>
          <div className="row justify-content-md-center mt-1">
            <div className="col-12 col-sm-4 text-center">
              <Link onClick={handleClick} className="btn btn-primary btn-block btn-lg text-white text-decoration-none" href={Config.ConfigAppUrl+"Auth/EscortRegister3"} >
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
