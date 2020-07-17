import React, {useState,useEffect} from 'react';
import '../../App.css';
import logo from '../../assets/images/resources/erosapp-user-check.png';
import background from '../../assets/images/design/bg-erosapp-clientes.png';
import Link from '@material-ui/core/Link';
import Config from "../../helpers/config";
import ContentBox from "../../screens/ContentBox";
import StateContext from '../../helpers/contextState'
import Functions from "../../helpers/functions";
import store from "../../helpers/store";
import Autocomplete from "../AutocompleteCountryClient";


const divBackground = {
  backgroundImage: 'url(' + background + ')',
};

let url_continue = false;

function App() {
  const [gender, setGender]   =   useState(false)
  const [inputs, setInputs]   =   useState({
                                              nationality:"",
                                              gender:"",
                                            });

  const context               =   React.useContext(StateContext);

  function handleClick(e){
    e.preventDefault();
    if (store.get("client").nationality!==undefined && store.get("client").nationality!=='' && gender!=='') {

      /*PUSH DATA STORE*/
      let Client           =   store.get("client");
      Object.entries(inputs).map((v,k)=>{
        if (Client[v[0]]===undefined ) {
          Client[v[0]]   =   "";
        }
        Client[v[0]]     =   v[1] ;
      })
      store.set("client",Client);
      /*END PUSH DATA STORE*/

      url_continue         =   e.target.href;
      inputs.user_id       =   store.get("user").user_id;
      inputs.gender        =   store.get("client").gender;
      inputs.nationality   =   store.get("client").nationality;
      Functions.PostAsync("User","setClient",inputs,context,{name:"callbackContinue",funct:callbackContinue})
    }else {
      let modal = {
                status:true,
                title:"Campos incompletos",
                message:"Para completar el proceso de registro debes sumistrar la nationality y el género",
                ico:{
                      contentColor:"modal-ico-bg-primary",
                      ico:'fas fa-exclamation pl-3',
                    },
              }
      context.setState({dialog:modal})
    }
  }

  function callbackContinue(){
    document.location.href  = url_continue;
  }

  function _setInputs(gender){
    setInputs(gender)
    //console.log(gender);
  }

  function _setGender(gender){
    let _inputs         = inputs;
        _inputs.gender  = gender;

    setGender(gender);
    setInputs(_inputs);

    let storeClients  =   store.get("client");
    Object.entries(_inputs).map((v)=>{
      if (v[0]!=='nationality') {
        storeClients[v[0]]  = v[1]
      }
    })
    store.set("client",storeClients)
  }

  function KeyUp(e) {
    let name          =   e.target.name;
    let _inputs       =   inputs;
        _inputs[name] =   e.target.value;
        setInputs(_inputs)
  }

  useEffect(()=>{
    let __inputs    = inputs
        __inputs.gender =   (store.get("client").gender!==undefined)?store.get("client").gender:''
        __inputs.nationality =   (store.get("client").nationality!==undefined)?store.get("client").nationality:''
        setGender(__inputs.gender)
        setInputs(__inputs)
  },[])

  return (
    <div className="App-LogoCenter App-splash" style={divBackground}>
      <form className="App-form App-form-register">
        <div className="container">
          <div className="row justify-content-center set_width_container">
            <div className="col-sm-6">
              <div className="row justify-content-center">
                <div className="row justify-content-center">
                  <div className="col-6 col-sm-10 text-center mt-4">
                    <img className="img-fluid" src={logo} alt="ErosApp"/>
                  </div>
                </div>
              </div>
              <div className="row justify-content-center mt-4">
                <div className="col-12 col-sm-6 text-center">
                  <div className="App-Question text-center">Yo soy</div>
                </div>
              </div>
            </div>
          </div>
          <div className="row justify-content-center ">
            <Autocomplete inputs={inputs} setInputs={_setInputs}/>
          </div>
          <div className="row justify-content-center">
            <div className="col-12 col-sm-4 text-center mt-3 ">
              <ContentBox gender={gender} setGender={_setGender} />
            </div>
          </div>

          {(gender)?<div className="row justify-content-md-center mt-4 mb-4">
                      <div className="col-12 col-sm-4 text-center">
                        <Link onClick={handleClick} className="btn btn-primary btn-block btn-lg text-white text-decoration-none" href={Config.ConfigAppUrl+"Auth/clientRegister1"} >
                          Continuar
                        </Link>
                      </div>
                    </div>:''
          }
        </div>
      </form>
    </div>
  )
}

export default App;
