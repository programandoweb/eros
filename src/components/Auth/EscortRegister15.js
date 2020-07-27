import React,{useState,useEffect} from 'react';
import '../../App.css';
import background   from '../../assets/images/design/bg-cliente.jpeg';
import bancolombia  from '../../assets/images/resources/icono-bancolombia.png';
import sured  from '../../assets/images/resources/icono-sured.png';
import nequi  from '../../assets/images/resources/icono-nequi.png';
import Link from '@material-ui/core/Link';
import Config from "../../helpers/config";
import Autocomplete from "../Autocomplete";
import StateContext from '../../helpers/contextState'
import Functions from "../../helpers/functions";
import store from "../../helpers/store";
import Accounts from "../../screens/Accounts";

const divBackground = {
  backgroundImage: 'url(' + background + ')',
};

let user    = store.get("user");
let escort   = store.get("escort");

let url_continue = false;

function App() {

  const [inputs, setImputs] = useState({
                                          number_account_bank:"",
                                          number_nequi:"",
                                          number_identification:"",
                                          id_verification:0,
                                        });

  const context             =   React.useContext(StateContext);

  function callbackContinue(data){
    let modal = {
              status:true,
              title:"¡Registro con éxito!",
              message:"¡ya puedes usar tu cuenta!",
              ico:{
                    contentColor:"modal-ico-bg-green",
                    ico:'fas fa-check pl-1',
                  },
              customButtom:{
                link:Config.ConfigAppUrl+"Auth/Login",
              }
            }
    context.setState({dialog:modal})
    //document.location.href=url_continue;
  }

  function KeyUp(e) {
    let _store        =   store.get("escort")
    let name          =   e.target.name;
    let _inputs       =   inputs;
        _inputs[name] =   e.target.value;
        _store[name]  =   e.target.value;
        store.set("escort",_inputs)
        setImputs(_inputs)
  }

  function handleChange(e){
    store.set("escort",{...escort,[e.target.name]:e.target.value})
  }

  function handleClick(e){
    e.preventDefault();

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

    url_continue  =   e.target.href;
    let send      =   store.get("escort");
        send.user_id=store.get("user").user_id
        Functions.PostAsync("User","setEscort",send,context,{name:"callbackContinue",funct:callbackContinue})
  }

  useEffect(()=>{
    let __inputs    = inputs
    Object.entries(inputs).map((v,k)=>{
      if(escort[v[0]]!==undefined) {
        __inputs[v[0]]  = escort[v[0]];
      }
    })
    setImputs(__inputs)
  },[])

  return (
    <div className="App-LogoCenter App-splash" style={divBackground}>
      <form className="App-form App-form-register">
        <div className="container">
          <div className="row justify-content-center mt-4">
            <div className="col-12 col-sm-4 text-center">
              <div className="App-Question text-center">¿Dónde deseo recibir el dinero?</div>
            </div>
          </div>
          <div className="row justify-content-center">
            <div className="col-12 col-sm-4 mt-3">
              <Accounts
                setState={KeyUp}
                store="escort"
                icon={bancolombia}
                label="Bancolombia"
                name="number_account_bank"
                placeholder="1234 567 8910"
                htmlLabel="Número de cuenta"
              />
            </div>
          </div>
          <div className="row justify-content-center">
            <div className="col-12 col-sm-4 mt-3">
              <Accounts
                setState={KeyUp}
                store="escort"
                icon={sured}
                label="Sured"
                name="number_identification"
                placeholder="1234 567 8910"
                htmlLabel="Número de Cédula"
              />
            </div>
          </div>
          <div className="row justify-content-center">
            <div className="col-12 col-sm-4 mt-3">
              <Accounts
                setState={KeyUp}
                store="escort"
                icon={nequi}
                label="Nequi"
                name="number_nequi"
                placeholder="1234 567 8910"
                htmlLabel="Número de Celular"
              />
            </div>
          </div>
          <div className="row justify-content-md-center mt-3">
            <div className="col-12 col-sm-4 text-centerr">
              <div onClick={handleClick} className="btn btn-primary btn-block btn-lg text-white text-decoration-none" href={Config.ConfigAppUrl+"Auth/EscortRegister0"} >
                Finalizar
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default App;
