import React,{useState,useEffect} from 'react';
import '../../App.css';
import logo from '../../assets/images/resources/erosapp-hotel-prices.png';
import background from '../../assets/images/design/bg-motel.png';
import Link from '@material-ui/core/Link';
import Config from "../../helpers/config";
import Autocomplete from "../Autocomplete";
import StateContext from '../../helpers/contextState'
import Functions from "../../helpers/functions";
import store from "../../helpers/store";
import Selector from "../Selector";

const divBackground = {
  backgroundImage: 'url(' + background + ')',
};

let user    = store.get("user");
let motel   = store.get("motel");

let url_continue = false;

function App() {

  const [inputs, setImputs] = useState({
                                          price_hour:"",
                                          price_night:"",
                                          check_in:"",
                                          check_out:"",
                                        });

  const context             =   React.useContext(StateContext);

  function callbackContinue(data){
    document.location.href=url_continue;
  }

  function KeyUp(e) {
    let name          =   e.target.name;
    let _inputs       =   inputs;
        _inputs[name] =   e.target.value;
        store.set("motel",_inputs)
        setImputs(_inputs)
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
    

    url_continue=e.target.href;
    let send  =   inputs;
        send.user_id=store.get("user").user_id
    Functions.PostAsync("User","setMotel",send,context,{name:"callbackContinue",funct:callbackContinue})
  }

  useEffect(()=>{
    let __inputs    = inputs
    Object.entries(inputs).map((v,k)=>{
      if(motel[v[0]]!==undefined) {
        __inputs[v[0]]  = motel[v[0]];
      }
    })
    setImputs(__inputs)
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
          <div className="row justify-content-center mt-4">
            <div className="col-12 col-sm-6 text-center">
              <div className="App-Question text-center">Costo de alojamiento</div>
            </div>
          </div>
          <div className="row justify-content-center">
            <div className="col-12 col-sm-4 text-center mt-3">
              <div className="input-group mb-3">
                <div className="input-group-prepend ">
                  <span className="input-group-text">
                    <i className="fas fa-clock"></i>
                  </span>
                </div>
                <input  autoComplete="off"
                        defaultValue={inputs.price_hour}
                        onChange={KeyUp} type="text"
                        name="price_hour"
                        className="form-control text-right"
                        placeholder="Precio por hora" required/>
                <div className="input-group-append">
                  <span className="input-group-text">
                    <i className="fas fa-chevron-right"></i>
                  </span>
                </div>
              </div>
              <div className="input-group mb-3">
                <div className="input-group-prepend">
                  <span className="input-group-text">
                    <i className="fas fa-moon"></i>
                  </span>
                </div>
                <input
                        autoComplete="off"
                        defaultValue={inputs.price_night}
                        onChange={KeyUp}
                        type="text"
                        name="price_night"
                        className="form-control text-right"
                        placeholder="Precio por noche" required/>
                <div className="input-group-append">
                  <span className="input-group-text">
                    <i className="fas fa-chevron-right"></i>
                  </span>
                </div>
              </div>
              <div className="row">
                <div className="col">
                  <div className="App-Question--x2 text-left pt-2">Desde</div>
                </div>
                <div className="col-7">
                  <div className="input-group mb-3">
                    <input
                            autoComplete="off"
                            defaultValue={inputs.check_in}
                            onChange={KeyUp}
                            type="time"
                            min="07:00"
                            max="23:00"
                            name="check_in"
                            className="form-control text-left"
                            placeholder="09:00 am" required/>
                    <div className="input-group-append">
                      <span className="input-group-text">
                        <i className="fas fa-clock"></i>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col">
                  <div className="App-Question--x2 text-left pt-2">Hasta</div>
                </div>
                <div className="col-7">
                  <div className="input-group mb-3">
                    <input
                            autoComplete="off"
                            defaultValue={inputs.check_out}
                            onChange={KeyUp}
                            type="time"
                            min="07:00"
                            max="23:00"
                            name="check_out"
                            className="form-control text-left"
                            placeholder="09:00 pm" required/>
                    <div className="input-group-append">
                      <span className="input-group-text">
                        <i className="fas fa-clock"></i>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row justify-content-md-center mt-1">
            <div className="col-12 col-sm-4 text-center mb-4">
              <Link onClick={handleClick} className="btn btn-primary btn-block btn-lg text-white text-decoration-none" href={Config.ConfigAppUrl+"Auth/HotelRegister4"} >
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
