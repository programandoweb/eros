import React from 'react';
import '../../App.css';
import logo from '../../assets/images/resources/erosapp-user-check.png';
import background from '../../assets/images/resources/bg.png';
import Link from '@material-ui/core/Link';
import Config from "../../helpers/config";
import ContentBox from "../../screens/ContentBoxRol";

const divBackground = {
  backgroundImage: 'url(' + background + ')',
};

function App() {

  return (
    <div className="App-LogoCenter App-splash" style={divBackground}>
      <form className="App-form App-form-register">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-6 col-sm-3 text-center">
              <img className="img-fluid" src={logo} alt="ErosApp"/>
            </div>
          </div>
          <div className="row justify-content-center set_width_container">
            <div className="col-sm-6">
              <div className="row justify-content-center mt-4">
                <div className="col-12 col-sm-6 text-center">
                  <div className="App-Question text-center">¿Qué deseas ser?</div>
                </div>
              </div>
            </div>
          </div>
          <div className="row justify-content-md-center mt-1">
            <div className="col-12 col-sm-4 text-center">
              <ContentBox />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default App;
