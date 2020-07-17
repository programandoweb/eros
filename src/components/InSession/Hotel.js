import React from 'react';
let defaultState  = {
                      user:false,
                      loading: false,
                      splash: true,
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
  render() {
    return (
      <div>Hotel</div>
    );
  }
}

export default App;
