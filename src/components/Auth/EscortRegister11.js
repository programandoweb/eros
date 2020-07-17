import React,{useState,useEffect} from 'react';
import '../../App.css';
import logo from '../../assets/images/resources/icono-mi-domicilio.png';
import background   from '../../assets/images/design/bg-cliente.jpeg';
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
let escort  = store.get("escort");

function App() {

  const [inputs, setInputs] = useState({
                                          photo_0:'',
                                          photo_1:'',
                                          photo_2:'',
                                          photo_3:'',
                                          photo_4:'',
                                          photo_5:'',
                                          photo_6:'',
                                        });
  const [photo_0, setPhoto_0] = useState("");
  const [photo_1, setPhoto_1] = useState("");
  const [photo_2, setPhoto_2] = useState("");
  const [photo_3, setPhoto_3] = useState("");
  const [photo_4, setPhoto_4] = useState("");
  const [photo_5, setPhoto_5] = useState("");
  const [photo_6, setPhoto_6] = useState("");

  const context             =   React.useContext(StateContext);

  const url_continue        =   Config.ConfigAppUrl+"Auth/EscortRegister12";

  function callbackContinue(data){
    let insert  = store.get("escort");
        Object.entries(inputs).map((v)=>{
          insert[v[0]]=v[1]
        })
    store.set("escort",insert);

    //document.location.href  = url_continue;
  }

  function handleChange(e){
    store.set("escort",{...escort,[e.target.name]:e.target.value})
  }

  function handleClick(e){
    e.preventDefault();
    inputs.token  = user.token;
    if (  inputs.photo_1==='' ||
          inputs.photo_2==='' ||
          inputs.photo_3==='') {
      let modal = {
                status:true,
                title:"Error",
                message:"Debes seleccionar al menos una foto",
                ico:{
                      contentColor:"modal-ico-bg-primary",
                      ico:'fas fa-exclamation pl-3',
                    },
              }
      context.setState({dialog:modal})
    }else{
      document.location.href= e.target.href
    }
  }

  function handleUpload(e){
    let renameFile  = e.target.attributes['doc'].value;
    console.log(renameFile); return
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

        set_photos(v)

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
        set_photos([v[0],store.get("base_url")+escort[v[0]]])
      }
    })
    setInputs(__inputs)
  },[])

  function set_photos(v){
    switch (v[0]) {
      case "photo_0":
        setPhoto_0(v[1])
      break;
      case "photo_1":
        setPhoto_1(v[1])
      break;
      case "photo_2":
        setPhoto_2(v[1])
      break;
      case "photo_3":
        setPhoto_3(v[1])
      break;
      case "photo_4":
        setPhoto_4(v[1])
      break;
      case "photo_5":
        setPhoto_5(v[1])
      break;
      case "photo_6":
        setPhoto_6(v[1])
      break;
    }
  }

  return (
    <div className="App-LogoCenter App-splash" style={divBackground}>
      <form className="App-form App-form-register">
        <div className="container">
          <div className="row justify-content-center mb-4">
            <div className="col-12 col-sm-6 text-center">
              <div className="App-Question text-center">¡Sube tus videos aquí!</div>
              <div className="text-gray h6" href={Config.ConfigAppUrl+"Auth/Recover"} >
                Máximo 4 videos
              </div>
            </div>
          </div>
          <div className="row justify-content-center">
            <div className="col-4 col-sm-4 mb-2 text-center">
              <div className="btn btn-secondary text-white p-0 position-relative upload">
                <input accept="image/*" doc="photo_0" onChange={handleUpload} type="file" name="userfile"/>
                {(photo_0==='')?<i className="fas fa-plus fa-2x p-4"></i>:<img src={photo_0} className="img-fluid"/>}
              </div>
            </div>
          </div>

          <div className="row justify-content-center">
            <div className="col-12 col-sm- text-center">

                <div className="text-gray h6" href={Config.ConfigAppUrl+"Auth/Recover"} >
                  Peso límite 150 MB.
                </div>
            </div>
          </div>

          <div className="row justify-content-center" >
            <div className="col-12 col-sm-4 text-left mt-3">

                <div className="text-gray h6 " href={Config.ConfigAppUrl+"Auth/Recover"} >
                  Tus videos.
                </div>
            </div>
          </div>

          <div className="row justify-content-center">
            <div className="col-12 col-sm-4 text-center mt-2">
              <div className="row justify-content-center">
                <div className="col-4 col-sm-4 mb-4">
                  <div className="btn btn-secondary text-white p-0 position-relative upload">
                    <input accept="image/*" doc="photo_1" onChange={handleUpload} type="file" name="userfile"/>
                    {(photo_1==='')?<i className="fas fa-plus fa-2x p-4"></i>:<img src={photo_1} className="img-fluid"/>}
                  </div>
                </div>
                <div className="col-4 col-sm-4 mb-4">
                  <div className="btn btn-secondary text-white p-0 position-relative upload">
                    <input accept="image/*" doc="photo_2" onChange={handleUpload} type="file" name="userfile"/>
                    {(photo_2==='')?<i className="fas fa-plus fa-2x p-4"></i>:<img src={photo_2} className="img-fluid"/>}
                  </div>
                </div>
                <div className="col-4 col-sm-4 mb-4">
                  <div className="btn btn-secondary text-white p-0 position-relative upload">
                    <input accept="image/*" doc="photo_3" onChange={handleUpload} type="file" name="userfile"/>
                    {(photo_3==='')?<i className="fas fa-plus fa-2x p-4"></i>:<img src={photo_3} className="img-fluid"/>}
                  </div>
                </div>
              </div>
              <div className="row justify-content-center">
                <div className="col-4 col-sm-4 mb-4">
                  <div className="btn btn-secondary text-white p-0 position-relative upload">
                    <input accept="image/*" doc="photo_4" onChange={handleUpload} type="file" name="userfile"/>
                    {(photo_4==='')?<i className="fas fa-plus fa-2x p-4"></i>:<img src={photo_4} className="img-fluid"/>}
                  </div>
                </div>
                <div className="col-4 col-sm-4 mb-4">
                  <div className="btn btn-secondary text-white p-0 position-relative upload">
                    <input accept="image/*" doc="photo_5" onChange={handleUpload} type="file" name="userfile"/>
                    {(photo_5==='')?<i className="fas fa-plus fa-2x p-4"></i>:<img src={photo_5} className="img-fluid"/>}
                  </div>
                </div>
                <div className="col-4 col-sm-4 mb-4">
                  <div className="btn btn-secondary text-white p-0 position-relative upload">
                    <input accept="image/*" doc="photo_6" onChange={handleUpload} type="file" name="userfile"/>
                    {(photo_6==='')?<i className="fas fa-plus fa-2x p-4"></i>:<img src={photo_6} className="img-fluid"/>}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row justify-content-md-center mt-1">
            <div className="col-12 col-sm-4 text-centerr">
              <Link onClick={handleClick} className="btn btn-primary btn-block btn-lg text-white text-decoration-none" href={Config.ConfigAppUrl+"Auth/EscortRegister7"} >
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
