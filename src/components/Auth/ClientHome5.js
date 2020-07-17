import React,{useState,useEffect} from 'react';
import '../../App.css';
import logo from '../../assets/images/resources/icon-id.png';
import background from '../../assets/images/design/background.jpg';
import Link from '@material-ui/core/Link';
import Config from "../../helpers/config";
import Autocomplete from "../Autocomplete";
import StateContext from '../../helpers/contextState'
import Functions from "../../helpers/functions";
import store from "../../helpers/store";
import photo_cc_frontalDefault from '../../assets/images/design/image-cc-default.jpg';
import photo_cc_backDefault from '../../assets/images/design/image-cc2-default.jpg';

const divBackground = {
  backgroundImage: 'url(' + background + ')',
};

let user  = store.get("user");
let escort= store.get("escort");

function App() {

  const [inputs, setInputs] = useState({
                                          photo_cc_frontal:"",
                                          photo_cc_back:"",
                                          typeDocument:"",
                                          accept:"",
                                        });

  const context             =   React.useContext(StateContext);

  const url_continue        =   Config.ConfigAppUrl+"Auth/EscortRegister4";

  function callbackContinue(data){
    let insert  = store.get("escort");
        Object.entries(inputs).map((v)=>{
          insert[v[0]]=v[1]
        })
    store.set("escort",insert);
    let modal = {
              status:true,
              title:"¡Registro con éxito!",
              message:"¡ya puedes usar tu cuenta!",
              ico:{
                    contentColor:"modal-ico-bg-primary",
                    ico:'fas fa-check pl-1',
                  },
              customButtom:{
                link:Config.ConfigAppUrl+"Auth/EscortRegister5",
              }
            }
    context.setState({dialog:modal})
    //document.location.href  = url_continue;
  }

  function handleChange(e){
    store.set("escort",{...escort,[e.target.name]:e.target.value})

  }

  function handleClick(e){
    e.preventDefault();
    inputs.token  = user.token;
    if (inputs.ano!=='' && inputs.mes!=='' && inputs.dia!=='') {

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
      
      console.log(Motel);
      Functions.PostAsync("User","setEscortRegister",{token:user.token,birth_date:inputs.ano+'-'+inputs.mes+'-'+inputs.dia},context,{name:"callbackContinue",funct:callbackContinue})
    }else{

    }
  }

  function handleUpload(e){
    let renameFile  = e.target.attributes['doc'].value;
    Functions.PostAsync("User","uploadDocument",{renameFile:renameFile,token:user.token,userfile:e.target.files[0],type:e.target.attributes['doc'].value},context,{name:"callbackChangeImage",funct:callbackChangeImage})
    e.preventDefault();
  }

  function callbackChangeImage(data){
    Object.entries(data.response).map((v)=>{
      if (v[0]!=='error' && v[0]!=='callback') {
        setInputs({
          ...inputs,
          [v[0]]: v[1]
        });
        let push        = store.get("escort");
            push[v[0]]  = v[1]
        store.set("escort",push);
      }
    })
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

        <div className="container ">
          <div className="row justify-content-center mb-2">
              <div className="col-12 col-sm-4 text-center  pb-2 mt-4 ">
                <div className="text-center text-fucsia ">
                  Sexy20, 29
                </div>
              </div>
          </div>
        </div>



        <div className="container ">
          <div className="row justify-content-center mb-2">
              <div className="col-12 col-sm-4 text-left  pb-2 ">
                <div className="text-left App-Question--x2 border-top pt-2">
                  Escoge el servicio
                </div>
              </div>
          </div>
        </div>

        <div className="container">
          <div className="row justify-content-center">
              <div className="col-12 col-sm-4 text-left ">
                <div className="input-group mb-3">
                    <select className="form-control" name="type_identity_document" onChange={handleChange} defaultValue={escort.type_identity_document}>
                      <option>Selecciona el servicio</option>
                      <option value="Cédula de ciudadanía">Prepago</option>
                      <option value="Cédula de extrajería">Escort</option>
                      <option value="Cédula de extrajería">Show Striptease</option>
                      <option value="Cédula de extrajería">Amanecida</option>
                      <option value="Cédula de extrajería">Videochat</option>
                  </select>
                </div>
              </div>
          </div>
        </div>


        <div className="container ">
          <div className="row justify-content-center mb-2">
              <div className="col-12 col-sm-4 text-left  pb-2 ">
                <div className="text-left App-Question--x2 border-top pt-2">
                  Escoge el lugar de encuentro
                </div>
              </div>
          </div>
        </div>


        <div className="container">
          <div className="row justify-content-center">
              <div className="col-12 col-sm-4 text-left">
                <div className="input-group mb-3">
                    <select className="form-control" name="type_identity_document" onChange={handleChange} defaultValue={escort.type_identity_document}>
                      <option>Selecciona el lugar</option>
                      <option value="Cédula de ciudadanía">Casa</option>
                      <option value="Cédula de extrajería">A domicilio</option>
                  </select>
                </div>
              </div>
          </div>
        </div>


        <div className="container ">
          <div className="row justify-content-center mb-2">
              <div className="col-12 col-sm-4 text-left  pb-2 ">
                <div className="text-left App-Question--x2 border-top pt-2">
                  <i class="far fa-calendar mr-2"></i>
                  Define la fecha
                </div>
              </div>
          </div>
        </div>

        <div className="container">
          <div className="row justify-content-center">
              <div className="col-12 col-sm-4 text-left ">
                <div className="input-group mb-3 ">
                  <select className="form-control " name="type_identity_document" onChange={handleChange} defaultValue={escort.type_identity_document}>
                    <option>Define la fecha</option>
                  </select>
                </div>
              </div>
          </div>
        </div>


        <div className="container ">
          <div className="row justify-content-center mb-2">
              <div className="col-12 col-sm-4 text-left  pb-2 ">
                <div className="text-left App-Question--x2 pt-2 border-top">
                <i class="far fa-clock mr-2"></i>
                  Define el tiempo
                </div>
              </div>
          </div>
        </div>

        <div className="container">
          <div className="row justify-content-center">
              <div className="col-6 col-sm-2 text-left  pt-2">
                <div className="App-Question--x2 text-left">Hora de inicio:</div>
              </div>

              <div className="col-6 col-sm-2 text-left  pt-2">
                <div className="App-Question--x2 text-right">Relog</div>
              </div>
          </div>
        </div>

        <div className="container">
          <div className="row justify-content-center ">
              <div className="col-6 col-sm-2 text-left  pt-2 border-bottom">
                <div className="App-Question--x2 text-left ">Hora final:</div>
              </div>

              <div className="col-6 col-sm-2 text-left  pt-2 border-bottom">
                <div className="App-Question--x2 text-right">Relog</div>
              </div>
          </div>
        </div>


        <div className="container">
          <div className="row justify-content-md-center mt-2 mb-4">
            <div className="col-12 col-sm-4 text-center">
              <div className="btn btn-primary btn-block btn-lg text-white text-decoration-none">
                Solicitar servicio
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default App;
