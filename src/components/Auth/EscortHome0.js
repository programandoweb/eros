import React,{useState,useEffect} from 'react';
import '../../App.css';
import background   from '../../assets/images/design/bg-cliente.jpeg';


import disponible  from '../../assets/images/resources/icon-clock.png';
import ficha  from '../../assets/images/resources/eroscoin.png';
import logo from '../../assets/images/resources/logo.png';
import Config from "../../helpers/config";

import StateContext from '../../helpers/contextState'
import Functions from "../../helpers/functions";
import store from "../../helpers/store";
import Services from "../../screens/Services";


import Selector from "../Selector";



const divBackground = {
  backgroundImage: 'url(' + background + ')',
};



let user    = store.get("user");
let motel   = store.get("motel");

let url_continue = false;

const  inputsDefault  = {
                          eleccion:{
                            items:["Si","No"],
                            selection:"Si",
                          },

                        }


function App() {
  //const [inputs, setImputs] = useState(inputsDefault);

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
          <div className="col-6 col-sm-3 text-center">
            <img className="img-fluid" src={logo} alt="ErosApp"/>
          </div>
        </div>

        <div className="row justify-content-center mt-5 ">
          <div className="col-12 col-sm-4 ">
            <Services
              icon={ficha}
              label="$100"
              name="prepaid"
              placeholder="0.00"
              htmlLabel="30 Minutos"
            />


          </div>
        </div>


          <div className="row justify-content-center">
            <div className="col-12 col-sm-4 mt-4">
              <Services
                icon={disponible}
                label="No disponible"
                name="prepaid"
                placeholder="0.00"
                htmlLabel="30 Minutos"
              />
              <div className="text-gray "> Si esta desactivado, tu perfil no estará disponible para
              prestar servicios.</div>

            </div>
          </div>

        </div>
      </form>
    </div>
  );
}

export default App;
