import React,{useEffect} from 'react';
import Link from '@material-ui/core/Link';
import Config from "../helpers/config";

function App(props) {

  const   generos = [ {
                        label:"Cliente",
                        ico:"fa-user",
                        link:"Auth/ClientRegister0",
                      },{
                        label:"Escort",
                        ico:"fa-female",
                        link:"Auth/EscortRegister0",
                      },{
                        label:"Hotel",
                        ico:"fa-building",
                        link:"Auth/HotelRegister0",
                      }
                    ]

  useEffect(()=>{
    content()
  },[])

  function content(){
    let elements = document.querySelectorAll(".box-1x1");
    Object.entries(elements).map((v)=>{
      v[1].style.height = v[1].offsetWidth + 'px'
    })
  }

  return (<div className="row mt-2 content-box">
            {
              generos.map((v,k)=>{
                            return  <div key={k} className="col-4 text-center p-1">
                                      <Link className="text-decoration-none" href={Config.ConfigAppUrl+v.link} >
                                        <div className={(props.genero===v.label)?'box-1x1 box-1x1-active':'box-1x1'}>
                                          <i className={"fas "+v.ico+" fa-2x text-primary"}></i>
                                          <span>{v.label}</span>
                                        </div>
                                      </Link>
                                    </div>})
            }
          </div>
  )
}

export default App;
