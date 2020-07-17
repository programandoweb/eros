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
let motel   = store.get("motel");

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
    let name          =   e.target.name;
    let _inputs       =   inputs;
        _inputs[name] =   e.target.value;
        store.set("motel",_inputs)
        setImputs(_inputs)
  }

  function handleChange(e){
    store.set("motel",{...motel,[e.target.name]:e.target.value})
  }

  function handleClick(e){
    e.preventDefault();
    /*PUSH DATA STORE*/
    let Motel           =   store.get("motel");
    Object.entries(inputs).map((v,k)=>{
      if (Motel[v[0]]===undefined ) {
        Motel[v[0]]   =   "";
      }
      Motel[v[0]]     =   v[1] ;
    })
    store.set("motel",Motel);
    /*END PUSH DATA STORE*/

    url_continue=e.target.href;
    let send  =   store.get("motel");
        send.user_id=store.get("user").user_id
    Functions.PostAsync("User","setMotel",send,context,{name:"callbackContinue",funct:callbackContinue})
  }

  useEffect(()=>{
    let __inputs    = inputs
    Object.entries(inputs).map((v,k)=>{
      if(motel[v[0]]!==undefined) {
        __inputs[v[0]]  = motel[v[0]];
      }
    })
    setImputs(__inputs)
  },[])

  return (
    <div className="App-LogoCenter App-splash" style={divBackground}>
      <form className="App-form App-form-register">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-12 col-sm-4 mt-3">
              <Accounts
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
                icon={nequi}
                label="Nequi"
                name="number_nequi"
                placeholder="1234 567 8910"
                htmlLabel="Número de Celular"
              />
            </div>
          </div>

        </div>
      </form>
    </div>
  );
}

export default App;
