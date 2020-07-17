/*
  DESARROLLO Y PROGRAMACIÓN PROGRAMANDOWEB
  lic.jorgemendez@gmail.com
  +573115000926
*/

import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
//import 'bootstrap/dist/css/bootstrap.min.css';

/*
  GENERO MI RENDERIZADO EN EL ELEMENTO ROOT
  DECLARADO EN MI INDEX.HTMML PÚBLICO
*/

ReactDOM.render(<App />,document.getElementById('root'));
serviceWorker.register();
