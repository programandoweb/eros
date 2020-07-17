import React,{useState,useEffect} from 'react';
import '../../App.css';

import background from '../../assets/images/design/bg-cliente.jpeg';

import Config from "../../helpers/config";

import StateContext from '../../helpers/contextState'

import store from "../../helpers/store";


const divBackground = {
  backgroundImage: 'url(' + background + ')',
};


let escort= store.get("escort");

function App() {

  const [inputs, setInputs] = useState({
                                          ano:"",
                                          mes:"",
                                          dia:"",
                                        });





  const url_continue        =   Config.ConfigAppUrl+"Auth/EscortRegister4";

  

  function callbackContinue(data){
    let insert  = store.get("escort");
        Object.entries(inputs).map((v)=>{
          insert[v[0]]=v[1]
        })
    store.set("escort",insert);
    document.location.href  = url_continue;
  }


  return (
    <div className="App-LogoCenter App-splash" style={divBackground}>
      <form className="App-form App-form-register">
        <div className="container">



          <div className="row justify-content-center mt-4 mb-4">
            <div className="col-12 col-sm-4 text-center">
              <div className="text-fuchsia text-center">¡Vamos, invita a otros chicos
              y chicas a utilizar Eros!</div>
            </div>
          </div>
          <div className="row justify-content-center mt-4 mb-4">
            <div className="col-12 col-sm-4 text-center">
              <div className=" text-gray text-left">¡Gana el 10% de descuento por el primer
              servicio que preste o tome tu referido!</div>
            </div>
          </div>

        </div>
      </form>
    </div>
  );
}

export default App;
