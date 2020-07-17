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
let motel  = store.get("motel");

function App() {

  const [inputs, setInputs] = useState({
                                          photo_0:'',
                                          photo_1:'',
                                          photo_2:'',
                                          photo_3:'',
                                          photo_4:'',
                                          photo_5:'',
                                          photo_6:'',
                                          photo_7:'',
                                          photo_8:'',
                                          photo_9:'',
                                          photo_10:'',
                                          photo_11:'',
                                          photo_12:'',
                                        });
  const [photo_0, setPhoto_0] = useState("");
  const [photo_1, setPhoto_1] = useState("");
  const [photo_2, setPhoto_2] = useState("");
  const [photo_3, setPhoto_3] = useState("");
  const [photo_4, setPhoto_4] = useState("");
  const [photo_5, setPhoto_5] = useState("");
  const [photo_6, setPhoto_6] = useState("");
  const [photo_7, setPhoto_7] = useState("");
  const [photo_8, setPhoto_8] = useState("");
  const [photo_9, setPhoto_9] = useState("");
  const [photo_10, setPhoto_10] = useState("");
  const [photo_11, setPhoto_11] = useState("");
  const [photo_12, setPhoto_12] = useState("");

  const context             =   React.useContext(StateContext);

  const url_continue        =   Config.ConfigAppUrl+"Auth/HotelRegister2";

  function callbackContinue(data){
    let insert  = store.get("escort");
        Object.entries(inputs).map((v)=>{
          insert[v[0]]=v[1]
        })
    store.set("escort",insert);

    //document.location.href  = url_continue;
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

        let push        = store.get("motel");
            push[v[0]]  = v[1]
        store.set("motel",push);
      }
    })
  }


  useEffect(()=>{
    let __inputs    = inputs
    Object.entries(inputs).map((v,k)=>{
      if(motel[v[0]]!==undefined) {
        __inputs[v[0]]  = motel[v[0]];
        set_photos([v[0],store.get("base_url")+motel[v[0]]])
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
      case "photo_7":
        setPhoto_7(v[1])
      break;
      case "photo_8":
        setPhoto_8(v[1])
      break;
      case "photo_9":
        setPhoto_9(v[1])
      break;
      case "photo_10":
        setPhoto_10(v[1])
      break;
      case "photo_11":
        setPhoto_11(v[1])
      break;
      case "photo_12":
        setPhoto_12(v[1])
      break;
    }
  }

  return (
    <div className="App-LogoCenter App-splash" style={divBackground}>
      <form className="App-form App-form-register">
        <div className="container">
          <div className="row justify-content-center mb-4 mt-4">
            <div className="col-12 col-sm-6 text-center">
              <div className="App-Question text-center">Elige tu foto de perfil </div>
              <div className="text-gray " >
                Formato JPG y PNG
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
                <div className="App-Question text-center">¡Sube tus mejores fotos!</div>
            </div>
          </div>

          <div className="row justify-content-center" >
            <div className="col-12 col-sm-4 text-center ">
                <div className="text-gray" href={Config.ConfigAppUrl+"Auth/Recover"} >
                  Formato PNG y JPG, máximo 6 fotos.
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

          <div className="row justify-content-center mb-4 mt-4">
            <div className="col-12 col-sm-6 text-center">
              <div className="App-Question text-center">¡Sube tus vieos!</div>
              <div className="text-gray " >
                Pero límite 150mb, máximo 6 videos.
              </div>
            </div>
          </div>

          <div className="row justify-content-center">
            <div className="col-12 col-sm-4 text-center mt-2">
              <div className="row justify-content-center">

                <div className="col-4 col-sm-4 mb-4">
                  <div className="btn btn-secondary text-white p-0 position-relative upload">
                    <input accept="image/*" doc="photo_7" onChange={handleUpload} type="file" name="userfile"/>
                    {(photo_7==='')?<i className="fas fa-plus fa-2x p-4"></i>:<img src={photo_7} className="img-fluid"/>}
                  </div>
                </div>
                <div className="col-4 col-sm-4 mb-4">
                  <div className="btn btn-secondary text-white p-0 position-relative upload">
                    <input accept="image/*" doc="photo_8" onChange={handleUpload} type="file" name="userfile"/>
                    {(photo_8==='')?<i className="fas fa-plus fa-2x p-4"></i>:<img src={photo_8} className="img-fluid"/>}
                  </div>
                </div>
                <div className="col-4 col-sm-4 mb-4">
                  <div className="btn btn-secondary text-white p-0 position-relative upload">
                    <input accept="image/*" doc="photo_9" onChange={handleUpload} type="file" name="userfile"/>
                    {(photo_9==='')?<i className="fas fa-plus fa-2x p-4"></i>:<img src={photo_9} className="img-fluid"/>}
                  </div>
                </div>
              </div>
              <div className="row justify-content-center">
                <div className="col-4 col-sm-4 mb-4">
                  <div className="btn btn-secondary text-white p-0 position-relative upload">
                    <input accept="image/*" doc="photo_10" onChange={handleUpload} type="file" name="userfile"/>
                    {(photo_10==='')?<i className="fas fa-plus fa-2x p-4"></i>:<img src={photo_10} className="img-fluid"/>}
                  </div>
                </div>
                <div className="col-4 col-sm-4 mb-4">
                  <div className="btn btn-secondary text-white p-0 position-relative upload">
                    <input accept="image/*" doc="photo_11" onChange={handleUpload} type="file" name="userfile"/>
                    {(photo_11==='')?<i className="fas fa-plus fa-2x p-4"></i>:<img src={photo_11} className="img-fluid"/>}
                  </div>
                </div>
                <div className="col-4 col-sm-4 mb-4">
                  <div className="btn btn-secondary text-white p-0 position-relative upload">
                    <input accept="image/*" doc="photo_12" onChange={handleUpload} type="file" name="userfile"/>
                    {(photo_12==='')?<i className="fas fa-plus fa-2x p-4"></i>:<img src={photo_12} className="img-fluid"/>}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row justify-content-md-center mt-1 mb-4">
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
