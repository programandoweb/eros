import React,{useState,useEffect} from 'react';
import '../../App.css';
import logo from '../../assets/images/resources/icono-mi-domicilio.png';
import background from '../../assets/images/design/background.jpg';
import Link from '@material-ui/core/Link';
import Config from "../../helpers/config";
import Autocomplete from "../Autocomplete";
import StateContext from '../../helpers/contextState'
import Functions from "../../helpers/functions";
import store from "../../helpers/store";
import photo_default from '../../assets/images/design/hotel.jpg';

const divBackground = {
  backgroundImage: 'url(' + background + ')',
};

let user    = store.get("user");
let motel  = store.get("motel");

function App() {

  const [inputs, setInputs] = useState({
                                          photo_1:"",
                                          photo_2:"",
                                          photo_3:"",
                                          photo_4:"",
                                          photo_5:"",
                                          accept:"",
                                        });

  const context             =   React.useContext(StateContext);

  const url_continue        =   Config.ConfigAppUrl+"Auth/HotelRegister2";

  function callbackContinue(data){
    let insert  = store.get("escort");
        Object.entries(inputs).map((v)=>{
          insert[v[0]]=v[1]
        })
    store.set("escort",insert);
    let modal = {
              status:true,
              title:"¡Registro con éxito!",
              message:"¡ya puedes usar tu cuenta Auroti!",
              ico:{
                    contentColor:"modal-ico-bg-primary",
                    ico:'fas fa-check pl-3',
                  },
              customButtom:{
                link:Config.ConfigAppUrl+"Auth/EscortRegister5",
              }
            }
    context.setState({dialog:modal})
    //document.location.href  = url_continue;
  }

  function handleChange(e){
    store.set("motel",{...motel,[e.target.name]:e.target.value})

  }

  function handleClick(e){
    e.preventDefault();
    inputs.token  = user.token;
    if (inputs.ano!=='' && inputs.mes!=='' && inputs.dia!=='') {
      Functions.PostAsync("User","setEscortRegister",{token:user.token,birth_date:inputs.ano+'-'+inputs.mes+'-'+inputs.dia},context,{name:"callbackContinue",funct:callbackContinue})
    }else{

    }
  }

  function handleUpload(e){
    let renameFile  = e.target.attributes['doc'].value;
    Functions.PostAsync("User","uploadPhoto",{renameFile:renameFile,token:user.token,userfile:e.target.files[0],type:e.target.attributes['doc'].value},context,{name:"callbackChangeImage",funct:callbackChangeImage})
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
      if(motel[v[0]]!==undefined) {
        __inputs[v[0]]  = motel[v[0]];
      }
    })
    setInputs(__inputs)

  },[])

  return (
    <div className="App-LogoCenter App-splash" style={divBackground}>
      <form className="App-form App-form-register">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-6 col-sm-4 text-center">
              <img className="img-fluid" src={logo} alt="ErosApp"/>
            </div>
          </div>
          <div className="row justify-content-center">
            <div className="col-12 col-sm-4 text-center">
              <div className="App-Question text-center">¡Sube las mejores fotos!</div>
                <div className="text-white text-decoration-none h6" href={Config.ConfigAppUrl+"Auth/Recover"} >
                  Formato PNG y JPG
                </div>
            </div>
          </div>
          <div className="row justify-content-center">
            <div className="col-12 col-sm-4 text-center">
              <div className="row justify-content-center">
                <div className="col-6 col-sm-4 mb-4">
                  <div className="btn btn-secondary text-white p-0 position-relative upload">
                    <img className="img-fluid" src={(inputs.photo_1!=='')?inputs.photo_1:photo_default} alt="front"/>
                  </div>
                </div>
                <div className="col-6 col-sm-4 mb-4">
                  <div className="btn btn-secondary text-white p-0 position-relative upload">
                    <img className="img-fluid" src={(inputs.photo_2!=='')?inputs.photo_2:photo_default} alt="front"/>
                  </div>
                </div>
                <div className="col-6 col-sm-4 mb-4">
                  <div className="btn btn-secondary text-white p-0 position-relative upload">
                    <img className="img-fluid" src={(inputs.photo_3!=='')?inputs.photo_3:photo_default} alt="front"/>
                  </div>
                </div>
              </div>
              <div className="row justify-content-center">
                <div className="col-6 col-sm-4 mb-4">
                  <div className="btn btn-secondary text-white p-0 position-relative upload">
                    <img className="img-fluid" src={(inputs.photo_4!=='')?inputs.photo_4:photo_default} alt="front"/>
                  </div>
                </div>
                <div className="col-6 col-sm-4 mb-4">
                  <div className="btn btn-secondary text-white p-0 position-relative upload">
                    <img className="img-fluid" src={(inputs.photo_5!=='')?inputs.photo_5:photo_default} alt="front"/>
                  </div>
                </div>
                <div className="col-6 col-sm-4 mb-4">
                  <div className="btn btn-secondary text-white p-0 position-relative upload">
                    <input accept="image/*" doc="photo_hotel_" onChange={handleUpload} type="file" name="userfile"/>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row justify-content-md-center mt-1">
            <div className="col-12 col-sm-4 text-centerr">
              <Link onClick={handleClick} className="btn btn-primary btn-block btn-lg text-white text-decoration-none" href={Config.ConfigAppUrl+"Auth/HotelRegister2"} >
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
