import React,{useState,useEffect} from 'react';
import '../../App.css';
import logo from '../../assets/images/resources/icon-id.png';
import icono1 from '../../assets/images/resources/icono-services.png';
import icono2 from '../../assets/images/resources/icono-advanced-search.png';

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

      console.log(Motel); return

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
                <div className="text-center App-Question ">
                  Buscador
                </div>
              </div>
          </div>
        </div>



        <div className="container ">
          <div className="row justify-content-center mb-2">
              <div className="col-12 col-sm-4 text-left  pb-2 ">
                <div className="text-left App-Question--x2 ">
                  <img src={icono1} alt="P" className="tamano-icono3 pr-2" />
                  Por servicio
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
                <div className="text-left App-Question--x2 ">
                  <i class="fas fa-dollar-sign mr-2 text-fucsia"></i>
                  Por precio
                </div>
              </div>
          </div>
        </div>


        <div className="container">
          <div className="row justify-content-center">
              <div className="col-12 col-sm-4 text-left">
                <div className="input-group mb-3">
                    <select className="form-control" name="type_identity_document" onChange={handleChange} defaultValue={escort.type_identity_document}>
                      <option>Menos de $100.000</option>
                      <option value="Cédula de ciudadanía">$100.000 - $200.000</option>
                      <option value="Cédula de extrajería">$200.000 - $300.000</option>
                      <option value="Cédula de extrajería">$300.000 - $400.000</option>
                      <option value="Cédula de extrajería">Más de $400.000</option>
                  </select>
                </div>
              </div>
          </div>
        </div>


        <div className="container ">
          <div className="row justify-content-center mb-2">
              <div className="col-12 col-sm-4 text-left  pb-2 ">
                <div className="text-left App-Question--x2 ">
                  Género
                </div>
              </div>
          </div>
        </div>

        <div className="container">
          <div className="row justify-content-center">
              <div className="col-12 col-sm-4 text-left">
                <div className="input-group mb-3">
                  <select className="form-control " name="type_identity_document" onChange={handleChange} defaultValue={escort.type_identity_document}>
                    <option>Mujer</option>
                    <option value="Cédula de ciudadanía">Hombre</option>
                    <option value="Cédula de ciudadanía">Lesbiana</option>
                    <option value="Cédula de ciudadanía">Gay</option>
                    <option value="Cédula de ciudadanía">Trans</option>
                  </select>
                </div>
              </div>
          </div>
        </div>


        <div className="container">
          <div className="row justify-content-md-center mt-2 mb-4">
            <div className="col-12 col-sm-4 text-center">
              <div className="btn btn-primary btn-block btn-lg text-white text-decoration-none">
                Busqueda Basica
              </div>
            </div>
          </div>
        </div>



        <div className="container ">
          <div className="row justify-content-center mb-2">
              <div className="col-12 col-sm-4 text-left  pb-2 ">
                <div className="text-left App-Question ">
                  Busqueda avanzada
                </div>
              </div>
          </div>
        </div>



        <div className="container">
          <div className="row justify-content-center">
              <div className="col-6 col-sm-2 text-left  pt-2">
                <div className="App-Question--x2 text-left">Edad:</div>
              </div>

              <div className="col-6 col-sm-2 text-left  pt-2">
                <div className="App-Question--x2 text-left">Nacionalidad:</div>
              </div>

          </div>
        </div>


        <div className="container">
          <div className="row justify-content-center">
            <div className="col-6 col-sm-2 text-left  pt-2">
              <div className="input-group mb-3">
                  <select className="form-control " name="type_identity_document" onChange={handleChange} defaultValue={escort.type_identity_document}>
                    <option>18 - 25</option>
                    <option value="Cédula de ciudadanía">25 - 30</option>
                    <option value="Cédula de ciudadanía">30 - 35</option>
                    <option value="Cédula de ciudadanía">Mayores de 35</option>

                  </select>
              </div>
            </div>

            <div className="col-6 col-sm-2 text-left  pt-2">
              <div className="input-group mb-3">
                <select className="form-control " name="type_identity_document" onChange={handleChange} defaultValue={escort.type_identity_document}>
                  <option>Venezuela</option>
                  <option value="Cédula de ciudadanía">Colombia</option>
                  <option value="Cédula de extrajería">Chile</option>
                  <option value="Cédula de extrajería">Peru</option>
                </select>
              </div>
            </div>
          </div>
        </div>


        <div className="container">
          <div className="row justify-content-center">
              <div className="col-6 col-sm-2 text-left  pt-2">
                <div className="App-Question--x2 text-left">Tono de piel:</div>
              </div>

              <div className="col-6 col-sm-2 text-left  pt-2">
                <div className="App-Question--x2 text-left">Contextura:</div>
              </div>

          </div>
        </div>


        <div className="container">
          <div className="row justify-content-center">
            <div className="col-6 col-sm-2 text-left  pt-2">
              <div className="input-group mb-3">
                <select className="form-control " name="type_identity_document" onChange={handleChange} defaultValue={escort.type_identity_document}>
                  <option>Claro</option>
                  <option value="Cédula de ciudadanía">Mestizo</option>
                  <option value="Cédula de ciudadanía">Oscuro</option>
                </select>
              </div>
            </div>

            <div className="col-6 col-sm-2 text-left pt-2">
              <div className="input-group mb-3">
                <select className="form-control " name="type_identity_document" onChange={handleChange} defaultValue={escort.type_identity_document}>
                  <option>Delgado</option>
                  <option value="Cédula de extrajería">Normal</option>
                  <option value="Cédula de ciudadanía">Fitness</option>
                  <option value="Cédula de ciudadanía">Con cirugias</option>
                </select>
              </div>
            </div>
          </div>
        </div>


        <div className="container">
          <div className="row justify-content-center">
              <div className="col-6 col-sm-2 text-left  pt-2">
                <div className="App-Question--x2 text-left">Color de cabello:</div>
              </div>

              <div className="col-6 col-sm-2 text-left  pt-2">
                <div className="App-Question--x2 text-left">Estilo de cabello:</div>
              </div>

          </div>
        </div>


        <div className="container">
          <div className="row justify-content-center">
            <div className="col-6 col-sm-2 text-left  pt-2">
              <div className="input-group mb-3">
                <select className="form-control " name="type_identity_document" onChange={handleChange} defaultValue={escort.type_identity_document}>
                  <option>Negro</option>
                  <option value="Cédula de extrajería">Castaño</option>
                  <option value="Cédula de ciudadanía">Rubio</option>
                  <option value="Cédula de ciudadanía">Rojizo</option>
                </select>
              </div>
            </div>

            <div className="col-6 col-sm-2 text-left  pt-2 mb-4">
              <div className="input-group mb-3">
                <select className="form-control " name="type_identity_document" onChange={handleChange} defaultValue={escort.type_identity_document}>
                  <option>Corto</option>
                  <option value="Cédula de extrajería">Largo</option>
                </select>
              </div>
            </div>

            <div className="container">
              <div className="row justify-content-md-center mt-0 mb-4">
                <div className="col-12 col-sm-4 text-center">
                  <div className="btn btn-primary btn-block btn-lg text-white text-decoration-none">
                    Busqueda Avanzada
                  </div>
                </div>
              </div>
            </div>


          </div>
        </div>

      </form>
    </div>
  );
}

export default App;
