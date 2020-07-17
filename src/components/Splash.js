import React from 'react';
import '../App.css';
import logo from '../assets/images/design/logo-vertical.png';
import background from '../assets/images/design/background.jpg';

const divBackground = {
  backgroundImage: 'url(' + background + ')',
};

function App() {
  return (
    <div className="App-LogoCenter App-splash" style={divBackground}>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-7 col-sm-4 text-center">
            <img className="img-fluid" src={logo} alt="ErosApp"/>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
