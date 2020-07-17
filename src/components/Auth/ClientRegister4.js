import React,{useState,useEffect}  from 'react';
import '../../App.css';
import logo from '../../assets/images/resources/icon-picture.png';
import male from '../../assets/images/design/image-default.jpg';
import background from '../../assets/images/design/background.jpg';
import Link from '@material-ui/core/Link';
import Config from "../../helpers/config";
import StateContext from '../../helpers/contextState'
import Functions from "../../helpers/functions";
import store from "../../helpers/store";


const divBackground = {
  backgroundImage: 'url(' + background + ')',
};

let user    = store.get("user");
let client  = store.get("client");

function App() {

  const [inputs, setInputs] = useState({
                                          photo_profile:'',
                                        });
  const [photo_profile, setPhoto_profile] = useState("");

  const context             =   React.useContext(StateContext);
  const url_continue        =   Config.ConfigAppUrl+"Auth/clientRegister5";

  function handleUpload(e){
    let renameFile  = e.target.attributes['doc'].value;
    Functions.PostAsync("User","uploadPhotoClient",{renameFile:renameFile,token:user.token,userfile:e.target.files[0],type:e.target.attributes['doc'].value},context,{name:"callbackChangeImage",funct:callbackChangeImage})
    e.preventDefault();
  }

  function callbackChangeImage(data){
    Object.entries(data.response).map((v)=>{
      if (v[0]!=='error' && v[0]!=='callback') {
        setInputs({
          ...inputs,
          [v[0]]: v[1]
        });

        let push        = store.get("client");
            push[v[0]]  = v[1]
        store.set("client",push);
        setPhoto_profile(v[1])
      }
    })
  }

  useEffect(()=>{
    let __inputs    = inputs
    Object.entries(inputs).map((v,k)=>{
      if(client[v[0]]!==undefined) {
        __inputs[v[0]]  = client[v[0]];
        setPhoto_profile(store.get("base_url")+client[v[0]])
      }
    })
    setInputs(__inputs)
  },[])

  return (
    <div className="App-LogoCenter App-splash" style={divBackground}>
      <form className="App-form App-form-register">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-6 col-sm-3 text-center mt-4">
              <img className="img-fluid" src={logo} alt="ErosApp"/>
            </div>
          </div>
          <div className="row justify-content-center mt-4 mb-1">
            <div className="col-6 col-sm-6 mb-2 text-center">
              <div className="btn btn-secondary text-white p-0 position-relative upload">
                <input accept="image/*" doc="photo_profile" onChange={handleUpload} type="file" name="userfile"/>
                {(photo_profile==='')?<i className="fas fa-plus fa-2x p-4"></i>:<img src={photo_profile} className="img-fluid"/>}
              </div>
            </div>
          </div>
          <div className="row justify-content-center mt-4 mb-1">
            <div className="col-12 col-sm-6 text-center">
              <div className="App-Question text-center">¡Así te verán!</div>
            </div>
          </div>
          <div className="row justify-content-center mt-0">
            <div className="col-12 col-sm-6 text-center">
              <div className="text-gray mb-2"> Formatos JPG y PNG</div>
            </div>
          </div>
          <div className="row justify-content-md-center mt-1 mb-4">
            <div className="col-12 col-sm-4">
              <Link className="btn btn-primary btn-block btn-lg text-white text-decoration-none" href={Config.ConfigAppUrl+"Auth/clientRegister5"} >
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
