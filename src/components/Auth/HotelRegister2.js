import React,{useState,useEffect} from 'react';
import '../../App.css';
import logo from '../../assets/images/resources/erosapp-icon-parking.png';
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
                                          has_parking:{
                                            items:["Si","No"],
                                            selection:"Si",
                                          },
                                          has_bathrom:{
                                            items:["Si","No"],
                                            selection:"Si",
                                          },
                                          description:"",
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
    let send  = {
      has_parking:store.get("motel").has_parking.selection,
      has_bathrom:store.get("motel").has_bathrom.selection,
      description:store.get("motel").description,
      user_id:store.get("user").user_id
    }
    Functions.PostAsync("User","setMotel",send,context,{name:"callbackContinue",funct:callbackContinue})
  }

  useEffect(()=>{
    let __inputs    = inputs

    /*init function push data*/
    Object.entries(inputs).map((v,k)=>{
      if(motel[v[0]]!==undefined && __inputs[v[0]].selection!==undefined) {
        __inputs[v[0]].selection  =   motel[v[0]];
      }else if(motel[v[0]]!==undefined && __inputs[v[0]].selection===undefined) {
        __inputs[v[0]]  =   motel[v[0]];
      }
    })
    /*end function push data*/

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
          <div className="row justify-content-center ">
            <div className="col-12 col-sm-4 text-center mt-3">
              <div className="App-Question text-center">¿Cuéntanos del lugar?</div>
            </div>
          </div>
          <div className="row justify-content-center mt-2">
            <div className="col-12 col-sm-4 ">
              <div className="App-Question--x2">¿Tiene parqueadero?</div>
            </div>
          </div>
          <div className="row justify-content-center">
            <div className="col-12 col-sm-4 mt-2">
              <Selector
                  setImputs={setImputs}
                  inputs={inputs}
                  name="has_parking" />
            </div>
          </div>
          <div className="row justify-content-center mt-2">
            <div className="col-12 col-sm-4 ">
              <div className="App-Question--x2">¿Tiene baño?</div>
            </div>
          </div>
          <div className="row justify-content-center">
            <div className="col-12 col-sm-4 mt-2">
              <Selector
                  setImputs={setImputs}
                  inputs={inputs}
                  name="has_bathrom" />
            </div>
          </div>
          <div className="row justify-content-center mt-2 mb-4">
            <div className="col-12 col-sm-4">
              <div className="App-Question--x2">¿Cómo lo describes?</div>
            </div>
          </div>
          <div className="row justify-content-center mt-3">
            <div className="col-12 col-sm-4 text-center">
              <div className="input-group mb-4">
                <textarea
                          defaultValue={inputs.description}
                          name="description"
                          onChange={KeyUp}
                          maxLength="120"
                          rows="6"
                          placeholder="Lorem Ipsum is simply dummy text of the printing and typesetting industry."
                          className="form-control" ></textarea>
              </div>
            </div>
          </div>
          <div className="row justify-content-md-center mt-1">
            <div className="col-12 col-sm-4 text-center mb-4">
              <Link onClick={handleClick} className="btn btn-primary btn-block btn-lg text-white text-decoration-none" href={Config.ConfigAppUrl+"Auth/HotelRegister3"} >
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
