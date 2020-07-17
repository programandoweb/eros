import React from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import './App.css';
import StateContext from './helpers/contextState';
import {Home,Dialog,Splash,QuestionAge,NotAgePermited,Auth} from "./components/Index";
import store from "./helpers/store";
import Functions from "./helpers/functions";



const  publicIp   =   require('public-ip');

let defaultState  = {
                      user:false,
                      loading: false,
                      splash: false,
                      loggedIn: false,
                      QuestionAge: false,
                      dialog:{
                                status:false,
                                title:"Título de la ventana",
                                message:"Prueba de mensaje",
                                callback:false
                      }
                    };

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state   =  defaultState;
    this.timeSplash = this.timeSplash.bind(this);
  }

  componentDidMount() {
    this.timeSplash()
    this.geoip()
  }

  componentWillUnmount() {
    this.timeSplash()
    this.geoip()
  }

  timeSplash=()=>{
    let _this = this
    setTimeout(function(){ _this.setState({splash:false}); }, 3000);
  }

  _setState=(data)=>{
    this.setState(data);
  }

  geoip=()=>{
    let geo = store.get("geoip");
    //console.log(geo.ipaddress);
    (async () => {
      const miip = await publicIp.v4()
      if (geo.ipaddress===undefined || geo.ipaddress!==miip){
        Functions.PostAsync("User","geoip",{ip:miip},{setState:this._setState,state:this.state},{name:"callbackSetGeoIp",funct:this.callbackSetGeoIp})
      }
    })();
  }

  callbackSetGeoIp=(data)=>{
    store.set("geoip",data.response);
  }

  Splash=()=>{
    if (this.state.splash && !this.state.QuestionAge) {
      return <Splash/>
    }else if (!this.state.splash && !this.state.QuestionAge) {
      return <QuestionAge/>
    }else{
      return <Home/>
    }
  }

  render() {
    return (
      <StateContext.Provider value={{setState:this._setState,state:this.state}}>
        <BrowserRouter>
          {(this.state.dialog.status)?<Dialog methods={{setState:this._setState,state:this.state}}/>:''}
          <Switch>
            <Route exact path="/" render={()=>this.Splash()}/>
            <Route exact path="/NotAgePermited" render={()=><NotAgePermited/>}/>
            <Route exact path="/Auth/*" render={()=><Auth/>}/>
          </Switch>
        </BrowserRouter>
      </StateContext.Provider>
    );
  }
}


export default App;
