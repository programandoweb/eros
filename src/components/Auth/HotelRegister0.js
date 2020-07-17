import React, {useState,useEffect} from 'react';
import '../../App.css';
import logo from '../../assets/images/resources/erosapp-hotel-location.png';
import background from '../../assets/images/design/bg-motel.png';
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
  const [genero, setGenero]   =   useState(false)
  const [inputs, setInputs]   =   useState({  name:"",
                                              address:"",
                                              phone:"", });

  const context             =   React.useContext(StateContext);

  function handleClick(e){
    e.preventDefault();
    if (inputs.name!=='' && inputs.address!=='' && inputs.phone!=='') {

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
      

      url_continue      =   e.target.href;
      inputs.user_id    =   store.get("user").user_id;

      Functions.PostAsync("User","setMotel",inputs,context,{name:"callbackContinue",funct:callbackContinue})
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

  function KeyUp(e) {
    let name          =   e.target.name;
    let _inputs       =   inputs;
        _inputs[name] =   e.target.value;
        setInputs(_inputs)
  }

  useEffect(()=>{
    let _inputs={
      name:store.get("motel").name,
      address:store.get("motel").address,
      phone:store.get("motel").phone,
    }
    setInputs(_inputs)
  },[])

  return (
    <div className="App-LogoCenter App-splash" style={divBackground}>
      <form className="App-form App-form-register">
        <div className="container">
          <div className="row justify-content-center set_width_container">
            <div className="col-sm-6">
              <div className="row justify-content-center">
                <div className="row justify-content-center">
                  <div className="col-6 col-sm-12 text-center mt-4">
                    <img className="img-fluid" src={logo} alt="ErosApp"/>
                  </div>
                </div>
              </div>
              <div className="row justify-content-center mt-4">
                <div className="col-12 col-sm-6 text-center">
                  <div className="App-Question text-center">¡Así es como te ubicarán!</div>
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
                <input autoComplete="off" defaultValue={inputs.name} onChange={KeyUp} type="text" name="name" className="form-control" placeholder="Nombre del Hotel / Motel" required/>
              </div>
            </div>
          </div>
          <div className="row justify-content-center">
            <div className="col-12 col-sm-4 text-center mt-3">
              <div className="input-group mb-3">
                <div className="input-group-prepend">
                  <span className="input-group-text">
                    <i className="fas fa-map-marker-alt"></i>
                  </span>
                </div>
                <input autoComplete="off" defaultValue={inputs.address} onChange={KeyUp} type="text" name="address" className="form-control" placeholder="Dirección" required/>
              </div>
            </div>
          </div>
          <div className="row justify-content-center">
            <div className="col-12 col-sm-4 text-center mt-3">
              <div className="input-group mb-3">
                <div className="input-group-prepend">
                  <span className="input-group-text">
                    <i className="fas fa-phone-alt"></i>
                  </span>
                </div>
                <input autoComplete="off" defaultValue={inputs.phone} onChange={KeyUp} type="text" name="phone" className="form-control" placeholder="Número telefónico del hotel" required/>
              </div>
            </div>
          </div>
          <div className="row justify-content-md-center mt-2 mb-4">
            <div className="col-12 col-sm-4 text-center">
              <Link onClick={handleClick} className="btn btn-primary btn-block btn-lg text-white text-decoration-none" href={Config.ConfigAppUrl+"Auth/HotelRegister1"} >
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
