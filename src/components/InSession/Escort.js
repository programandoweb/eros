import React from 'react';
import store from "../../helpers/store";
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

let user    = store.get("user");
let motel   = store.get("motel");

class App extends React.Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {

  }

  render() {
    return (
      <div>Escort</div>
    );
  }
}

export default App;
