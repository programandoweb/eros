import React,{useEffect} from 'react';
import man from '../assets/images/resources/icon-man.png';
import woman from '../assets/images/resources/icon-woman.png';
import gay from '../assets/images/resources/icon-gay.png';
import lesbian from '../assets/images/resources/icon-lesbian.png';
import trans from '../assets/images/resources/icon-trans.png';


function App(props) {

  const   generos = [ {
                        label:"Hombre",
                        ico:man
                      },{
                        label:"Mujer",
                        ico:woman
                      },{
                        label:"Gay",
                        ico:gay
                      },{
                        label:"Lesbi",
                        ico:lesbian
                      },{
                        label:"Trans",
                        ico:trans
                      },
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


  return (<div className="row mt-2 content-box ">
            {
              generos.map((v,k)=>{
                            return  <div key={k} className="col-4 text-center p-1">
                                      <div className={(props.gender===v.label)?'box-1x1 box-1x1-active rounded':'box-1x1 rounded'} onClick={()  =>{ props.setGender(v.label) }}>
                                        <img src={v.ico} />
                                        <span>{v.label}</span>
                                      </div>
                                    </div>})
            }
          </div>
  )
}

export default App;
