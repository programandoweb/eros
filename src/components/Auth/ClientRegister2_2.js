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


const divBackground = {
  backgroundImage: 'url(' + background + ')',
};

let url_continue = false;

function App() {
  const [insession, setInSession]   =   useState(false)
  const [genero, setGenero]         =   useState(false)
  const [inputs, setInputs]         =   useState({
                                                    username:"",
                                                    password:"",
                                                    password2:"",
                                                  });

  const context             =   React.useContext(StateContext);

  function handleClick(e){
    e.preventDefault();
    if ((inputs.username!=='' && inputs.password!=='' && inputs.password2!=='') || (insession && inputs.username!=='')) {

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


      if (inputs.password!==inputs.password2) {
        let modal = {
                  status:true,
                  title:"Error",
                  message:"Las contraseñas no coinciden, intenta nuevamente",
                  ico:{
                        contentColor:"modal-ico-bg-primary",
                        ico:'fas fa-exclamation pl-3',
                      },
                }
        context.setState({dialog:modal})
      }else {
        url_continue      =   e.target.href;
        inputs.user_id    =   store.get("user").user_id;
        inputs.password2  =   '';
        Functions.PostAsync("User","setUser",inputs,context,{name:"callbackContinue",funct:callbackContinue})
      }
    }else {
      let modal = {
                status:true,
                title:"Campos incompletos",
                message:"Para completar el proceso de registro debes sumistrar la nacionalidad y el género",
                ico:{
                      contentColor:"modal-ico-bg-primary",
                      ico:'fas fa-exclamation pl-3',
                    },
              }
      context.setState({dialog:modal})
    }
  }

  function callbackContinue(){
    let user  = store.get("user");
        user.username = inputs.username
        store.set("user",user);
        document.location.href  = url_continue;
  }

  function _setGenero(genero){
    let _inputs         = inputs;
        _inputs.genero  = genero;
    setGenero(genero);
    setInputs(_inputs)
  }

  function KeyUp(e) {
    if( e.target.name==='password' ||
        e.target.name==='password2'){
          if (e.target.type==='text') {
            e.target.type =   "password";
          }
    }
    let name          =   e.target.name;
    let _inputs       =   inputs;
        _inputs[name] =   e.target.value;
        setInputs(_inputs)
  }

  useEffect(()=>{
    let __inputs    = inputs
        __inputs.username =   store.get("user").username
        setInputs(__inputs)
        if (store.get("user").username!==undefined) {
          setInSession(true);
        }
  },[])

  return (
    <div className="App-LogoCenter App-splash" style={divBackground}>
      <form className="App-form App-form-register">
        <div className="container">
          <div className="row justify-content-center set_width_container">
            <div className="col-sm-6">
              <div className="row justify-content-center">
                <div className="row justify-content-center">
                  <div className="col-6 col-sm-7 text-center">
                    <img className="img-fluid" src={logo} alt="ErosApp"/>
                  </div>
                </div>
              </div>
              <div className="row justify-content-center mt-4">
                <div className="col-12 col-sm-6 text-center">
                  <div className="App-Question text-center">Inicio de Sesión</div>
                </div>
              </div>
            </div>
          </div>
          <div className="row justify-content-center">
            <div className="col-12 col-sm-4 text-center mt-3">
              <div className="input-group mb-3">
                <div className="input-group-prepend">
                  <span className="input-group-text">
                    <i className="fas fa-user"></i>
                  </span>
                </div>
                <input autoComplete="off" defaultValue={inputs.username} onChange={KeyUp} type="text" name="username" className="form-control" placeholder="Nombre de usuario" required/>
              </div>

              {

                (!insession)?<><div className="input-group mb-3">
                  <div className="input-group-prepend">
                    <span className="input-group-text">
                      <i className="fas fa-lock"></i>
                    </span>
                  </div>
                  <input autoComplete="off" onChange={KeyUp}  onKeyUp={KeyUp} type="text" name="password" className="form-control" placeholder="Contraseña" required/>
                </div>
                <div className="input-group mb-3">
                  <div className="input-group-prepend">
                    <span className="input-group-text">
                      <i className="fas fa-lock"></i>
                    </span>
                  </div>
                  <input autoComplete="off" onChange={KeyUp}  onKeyUp={KeyUp} type="text" name="password2" className="form-control" placeholder="Confirmar Contraseña" required/>
                </div></>:<div></div>
              }



            </div>
          </div>
          <div className="row justify-content-md-center mt-2">
            <div className="col-12 col-sm-4 text-center">
              <Link onClick={handleClick} className="btn btn-primary btn-block btn-lg text-white text-decoration-none" href={Config.ConfigAppUrl+"Auth/clientRegister4"} >
                Continuar
              </Link>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}

export default App;
