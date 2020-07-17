import React,{useState,useEffect} from 'react';
import '../../App.css';
import logo from '../../assets/images/resources/icon-eroscoin.png';
import background from '../../assets/images/design/bg-erosapp-clientes.png';
import Config from "../../helpers/config";
import StateContext from '../../helpers/contextState'
import Functions from "../../helpers/functions";
import store from "../../helpers/store";


const divBackground = {
  backgroundImage: 'url(' + background + ')',
};




function App() {

  const [inputs, setInputs] = useState({
                                          ano:"",
                                          mes:"",
                                          dia:"",
                                        });

  const context             =   React.useContext(StateContext);
  const url_continue        =   Config.ConfigAppUrl+"Auth/EscortRegister4";

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
    let send  =   store.get("motel");
        send.user_id=store.get("user").user_id
    Functions.PostAsync("User","setMotel",send,context,{name:"callbackContinue",funct:callbackContinue})
  }


  return (
    <div className="App-LogoCenter App-splash" style={divBackground}>
      <form className="App-form App-form-register">



        <div className="row justify-content-center">
          <div className="row justify-content-center">
            <div className="col-6 col-sm-6 text-center mb-4">
              <img className="img-fluid" src={logo} alt="ErosApp"/>
            </div>
          </div>
        </div>


        <div className="container">
          <div className="row justify-content-center">
              <div className="col-12 col-sm-4 text-left  p-2 background-text">
                <div className="text-left App-Question--x2 ">
                  Lucho$
                </div>
              </div>
          </div>
        </div>



        <div className="container ">
          <div className="row justify-content-center mb-4">
              <div className="col-6 col-sm-2 text-left  p-2 background-text border-right-0">
                <div className="text-left App-Question--x2 ">
                  Mi saldo
                </div>
              </div>

              <div className="col-6 col-sm-2 text-left  pb-2 background-text border-left-0">
                <div className="text-right App-Question--x2">
                  $100
                </div>
                <div className="App-Question--x2  text-fucsia text-right  ">
                  COP $50.000
                </div>
              </div>
          </div>
        </div>

        <div className="container ">
          <div className="row justify-content-center mb-4">
              <div className="col-12 col-sm-4 text-left  pb-2 ">
                <div className="text-center App-Question--x2 ">
                  ¿Cuánto deseas recargar?
                </div>
              </div>
          </div>
        </div>


        <div className="container">
          <div className="row justify-content-center">
              <div className="col-6 col-sm-2 text-left border-bottom">
                <div className="text-left App-Question--x2">
                  $100 Eroscoin
                </div>
                <div className="App-Question--x2  text-fucsia text-left pb-3  ">
                  COP $50.000
                </div>
              </div>

              <div className="col-6 col-sm-2 text-left border-bottom pt-2">
                <div onClick={handleClick} className="btn btn-primary btn-block btn-lg text-white text-decoration-none"
                  href={Config.ConfigAppUrl+"Auth/HotelRegister5"} >
                  Recargar
                </div>
              </div>
          </div>
        </div>


        <div className="container">
          <div className="row justify-content-center">
              <div className="col-6 col-sm-2 text-left border-bottom pt-2">
                <div className="text-left App-Question--x2">
                  $500 Eroscoin
                </div>
                <div className="App-Question--x2  text-fucsia text-left pb-3  ">
                  COP $200.000
                </div>
              </div>

              <div className="col-6 col-sm-2 text-left border-bottom pt-3">
                <div onClick={handleClick} className="btn btn-primary btn-block btn-lg text-white text-decoration-none"
                  href={Config.ConfigAppUrl+"Auth/HotelRegister5"} >
                  Recargar
                </div>
              </div>
          </div>
        </div>


        <div className="container">
          <div className="row justify-content-center">
              <div className="col-6 col-sm-2 text-left border-bottom pt-2">
                <div className="text-left App-Question--x2">
                  $1000 Eroscoin
                </div>
                <div className="App-Question--x2  text-fucsia text-left pb-3  ">
                  COP $400.000
                </div>
              </div>

              <div className="col-6 col-sm-2 text-left border-bottom pt-3">
                <div onClick={handleClick} className="btn btn-primary btn-block btn-lg text-white text-decoration-none"
                  href={Config.ConfigAppUrl+"Auth/HotelRegister5"} >
                  Recargar
                </div>
              </div>
          </div>
        </div>


        <div className="container mb-3">
          <div className="row justify-content-center">
              <div className="col-6 col-sm-2 text-left pt-2">
                <div className="text-left App-Question--x2">
                  $5000 Eroscoin
                </div>
                <div className="App-Question--x2  text-fucsia text-left ">
                  COP $1'500.000
                </div>
              </div>

              <div className="col-6 col-sm-2 text-left  pt-3">
                <div onClick={handleClick} className="btn btn-primary btn-block btn-lg text-white text-decoration-none"
                  href={Config.ConfigAppUrl+"Auth/HotelRegister5"} >
                  Recargar
                </div>
              </div>
          </div>
        </div>

      </form>
    </div>
  );
}

export default App;
