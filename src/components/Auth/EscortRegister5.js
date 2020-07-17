import React,{useState,useEffect} from 'react';
import '../../App.css';
import logo from '../../assets/images/resources/image-woman.png';
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
                                          description:"",
                                        });

  const context             =   React.useContext(StateContext);

  const url_continue        =   Config.ConfigAppUrl+"Auth/EscortRegister6";

  function callbackContinue(data){
    let insert  = store.get("escort");
        Object.entries(inputs).map((v)=>{
          insert[v[0]]=v[1]
        })
    store.set("escort",insert);
    document.location.href  = url_continue;
  }

  function handleChange(e){
    store.set("escort",{...escort,[e.target.name]:e.target.value})

  }

  function handleClick(e){
    e.preventDefault();
    inputs.token  = user.token;
    if (inputs.ano!=='' && inputs.mes!=='' && inputs.dia!=='') {
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
      Functions.PostAsync("User","setEscortRegister",Escort,context,{name:"callbackContinue",funct:callbackContinue})
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

  function onChange(e) {
    let name          =   e.target.name;
    let _inputs       =   inputs;
        _inputs[name] =   e.target.value;
        setInputs(_inputs)
  }

  useEffect(()=>{

    //console.log(escort);

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
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-6 col-sm-3 text-center mt-4">
              <img className="img-fluid" src={logo} alt="ErosApp"/>
            </div>
          </div>
          <div className="row justify-content-center">
            <div className="col-12 col-sm-6 text-center">
              <div className="App-Question text-center">¡Ahora crea tu perfil! </div>
            </div>
          </div>
          <div className="row justify-content-center mt-2 mb-4">
            <div className="col-12 col-sm-4">
              <div className="App-Question--x2">¿Cómo te describes?</div>
            </div>
          </div>
          <div className="row justify-content-center mt-3">
            <div className="col-12 col-sm-4 text-center">
              <div className="input-group mb-4 tamano-cuadro">
                <textarea maxLength="200"
                          value={inputs.description}
                          name="description"
                          placeholder="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, "
                          className="form-control"
                          onChange={onChange}></textarea>
              </div>
            </div>
          </div>
          <div className="row justify-content-md-center mt-1 mb-4">
            <div className="col-12 col-sm-4 text-centerr">
              <Link onClick={handleClick} className="btn btn-primary btn-block btn-lg text-white text-decoration-none" href={Config.ConfigAppUrl+"Auth/EscortRegister6"} >
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
