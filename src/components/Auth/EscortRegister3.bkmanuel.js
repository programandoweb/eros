import React,{useState,useEffect} from 'react';
import '../../App.css';
import logo from '../../assets/images/resources/icon-calendar.png';
import background from '../../assets/images/design/background.jpg';
import Link from '@material-ui/core/Link';
import Config from "../../helpers/config";
import Autocomplete from "../Autocomplete";
import StateContext from '../../helpers/contextState'
import Functions from "../../helpers/functions";
import store from "../../helpers/store";


const divBackground = {
  backgroundImage: 'url(' + background + ')',
};

let user  = store.get("user");
let escort= store.get("escort");

function App() {

  const [inputs, setInputs] = useState({
                                          ano:"",
                                          mes:"",
                                          dia:"",
                                        });

  const context             =   React.useContext(StateContext);
  const [anos,setAnos]      =   useState([])
  const [meses,setMeses]    =   useState([])
  const [dias,setDias]      =   useState([])
  const url_continue        =   Config.ConfigAppUrl+"Auth/EscortRegister4";

  function KeyUp(e) {
    let name          =   e.target.name;
    let _inputs       =   inputs;
        _inputs[name] =   e.target.value;
        setInputs(_inputs)
        escort[name]  =   e.target.value;
        store.set("escort",escort)

  }

  function callbackContinue(data){
    let insert  = store.get("escort");
        Object.entries(inputs).map((v)=>{
          insert[v[0]]=v[1]
        })
    store.set("escort",insert);
    document.location.href  = url_continue;
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

      Functions.PostAsync("User","setEscortRegister",{token:user.token,birth_date:inputs.ano+'-'+inputs.mes+'-'+inputs.dia},context,{name:"callbackContinue",funct:callbackContinue})
    }else{
      let modal = {
                status:true,
                title:"Error",
                message:"El formato de fecha no es correcto",
                ico:{
                      contentColor:"modal-ico-bg-primary",
                      ico:'fas fa-exclamation pl-3',
                    },
              }
      context.setState({dialog:modal})
    }
  }

  function ano(){
    let _return=[];
    for (var i = 0; i < 45; i++) {
      _return.push(2001 - i );
    }
    return _return;
  }

  function mes(){
    return ["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"];
  }

  function dia(){
    let _return=[];
    for (var i = 0; i < 31; i++) {
      if (i<9) {
        let sum =  i + 1
        _return.push( "0" + sum );
      }else {
        _return.push( i + 1);
      }
    }
    return _return;
  }

  useEffect(()=>{
    let __inputs    = inputs
    Object.entries(inputs).map((v,k)=>{
      if(escort[v[0]]!==undefined) {
        __inputs[v[0]]  = escort[v[0]];
      }
    })
    setAnos(ano());
    setMeses(mes());
    setDias(dia());
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
          <div className="row justify-content-center mt-4 mb-4">
            <div className="col-12 col-sm-6 text-center">
              <div className="App-Question text-center">Tu fecha de nacimiento</div>
            </div>
          </div>
          <div className="row justify-content-center mt-3">
            <div className="col-12 col-sm-4 text-center">
              <div className="input-group mb-3">
                <select className="form-control" onChange={KeyUp} name="ano" required value={escort.ano}>
                  <option>Año</option>
                  {anos.map((v,k) => {
                    return <option  key={k} value={v}>{v}</option>
                  })}
                </select>
                <select className="form-control" onChange={KeyUp} name="mes" required value={escort.mes}>
                  <option>Mes</option>
                  {meses.map((v,k) => {
                    return <option  key={k} value={ k + 1}>{v}</option>
                  })}
                </select>
                <select className="form-control" onChange={KeyUp} name="dia" required value={escort.dia}>
                  <option>Día</option>
                  {dias.map((v,k) => {
                    return <option  key={k} key={k} value={ k + 1} >{v}</option>
                  })}
                </select>
              </div>
            </div>
          </div>
          <div className="row justify-content-md-center mt-2 mb-4">
            <div className="col-12 col-sm-4 text-center">
              <Link onClick={handleClick} className="btn btn-primary btn-block btn-lg text-white text-decoration-none" href={Config.ConfigAppUrl+"Auth/EscortRegister3"} >
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
